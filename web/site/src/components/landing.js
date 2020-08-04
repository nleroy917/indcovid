/*
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

Landing page component
*/

import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import axios from 'axios';

import {
    Typography,
    Grid,
    useMediaQuery,
    Button,
    MobileStepper
} from '@material-ui/core';


import InfoCard from '../components/infocard';
import LandingChart from '../components/landingchart';
import LandingPie from '../components/landingpie';
import LandingMap from '../components/landingmap';

const COVID_19_API_NOW = 'https://covidtracking.com/api/v1/states/in/current.json'
const COVID_19_API_HISTORIC = 'https://covidtracking.com/api/v1/states/in/daily.json'
const API_URL = 'https://indianacovid-api.herokuapp.com/'

const Wrapper = styled.div`
    height: ${props => props.mobile ? '' : '90vh'};
    @media (max-width: 768px) {
      height: none;
  }

`

const SquareButton = styled(Button)`
  border-radius: 0px !important;
`

const MapWrapper = styled.div`
  position: relative; 
  padding-bottom: 80%; 
  height: 0; 
  max-width: 100%;  
  z-index: 40; 
  bottom: 0; 
  margin-bottom: -15px;
`

const IFrame = styled.iframe`
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
`

const MoreInfo = styled.span`
  font-size: 0.8rem;
  padding: 4px;
`

const LandingTitle = styled(Typography)`
    font-weight: 400 !important;
    font-size: 2.2rem !important;
    text-align: center;

`

const LandingSubTitle = styled(Typography)`
  font-weight: 300 !important;
`

const Landing = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const [covidNow, setCovidNow] = useState(0);
    const [covidHistoric, setCovidHistoric] = useState([]);
    const [dates, setDates] = useState([]);
    const [yeetedData, setYeetedData] = useState(null);
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    const iPadPro = useMediaQuery('(max-device-width:1024px)', { noSsr: true });

    const removeOutliers = (someArray) => {

        // Copy the values, rather than operating on references to existing values
        var values = someArray.concat();
    
        // Then sort
        values.sort( function(a, b) {
                return a - b;
             });
    
        /* Then find a generous IQR. This is generous because if (values.length / 4) 
         * is not an int, then really you should average the two elements on either 
         * side to find q1.
         */     
        var q1 = values[Math.floor((values.length / 4))];
        // Likewise for q3. 
        var q3 = values[Math.ceil((values.length * (3 / 4)))];
        var iqr = q3 - q1;
    
        // Then find min and max values
        var maxValue = q3 + iqr*3;
        var minValue = q1 - iqr*3;
    
        // Then filter anything beyond or beneath these values.
        var filteredValues = values.filter(function(x) {
            return (x <= maxValue) && (x >= minValue);
        });
    
        // Then return
        return filteredValues;
    
    }

    const cumulativeToDaily = (cumulative) => {

      let daily = []
      daily.push(0);

      let delta = 0

      for(let i = 0; i < cumulative.length - 1; i++) {

        delta = cumulative[i+1] - cumulative[i]

        if(delta < 0) {
          daily.push(0)
        } else{
          daily.push(delta)
        }

      }
      return removeOutliers(daily)
    }

    const fetchCovidNow = async () => {
        
        let res = await axios.get(COVID_19_API_NOW)
        if(res.status === 200) {
            let data = await res.data
            setCovidNow(data)
        }
    }

    const fetchCovidHistoric = async () => {
      let res = await axios.get(COVID_19_API_HISTORIC)
      if(res.status === 200) {
        let data = await res.data
        let data_rev = await data.reverse()
        let historic_data_full = {
          cases: [],
          deaths: [],
          recovered: [],
          hospitalized: [],
          tests: [],
          casesToday: data[data.length-1].positiveIncrease,
          testedToday: data[data.length-1].totalTestResultsIncrease,
          deathToday: data[data.length-1].deathIncrease,
          hospitalizedToday: data[data.length-1].hospitalizedIncrease
        }
        for(let i = 0; i < data_rev.length; i++) {

          let data_point = data_rev[i]
          let year  = data_point.date.toString().substring(0,4)
          let month = data_point.date.toString().substring(4,6)
          let day   = data_point.date.toString().substring(6,8)
          let date = new Date(year, month-1, day)

          dates.push(`${monthNames[date.getMonth()]} ${date.getDate()}`)
          historic_data_full.cases.push(
             data_point.positiveIncrease
          )
          historic_data_full.deaths.push(
             data_point.deathIncrease
          )
          historic_data_full.recovered.push(
             data_point.recovered
          )
          historic_data_full.hospitalized.push(
            data_point.hospitalizedIncrease
          )
          historic_data_full.tests.push(
            data_point.totalTestResultsIncrease
          )
        }
        historic_data_full.hospitalized = removeOutliers(historic_data_full.hospitalized)
        historic_data_full.recovered = cumulativeToDaily(historic_data_full.recovered)
        setCovidHistoric(historic_data_full)
      }
    }

    const yeetCovidData = async () => {
      let res = await axios.get(`${API_URL}/data/isdh/full`)
      
      if(res.status === 200) {
        let data = await res.data
        let icu_avail = data.metrics.data.m2b_hospitalized_icu_available
        let icu_covid = data.metrics.data.m2b_hospitalized_icu_occupied_covid
        let icu_else = data.metrics.data.m2b_hospitalized_icu_occupied_non_covid
        let icu_total = icu_avail[icu_avail.length-1] + icu_covid[icu_covid.length-1] + icu_else[icu_else.length-1]
        let yeeted_data = {
          icu: {
            available: (icu_avail[icu_avail.length-1]/icu_total)*100,
            covid: (icu_covid[icu_covid.length-1]/icu_total)*100, 
            other: (icu_else[icu_else.length-1]/icu_total)*100,
          }
        }
        setYeetedData(yeeted_data)
      }
    }

    useEffect(() => {
        fetchCovidNow()
        fetchCovidHistoric()
        yeetCovidData()
    }, [])
    if(covidNow && yeetedData){
    console.log('Mobile:', mobile)
    console.log('iPad:', iPad)
    return(
        <>
        <Wrapper
          mobile={MobileStepper}
        >
        {
          /* 
          LANDING TITLE, SUBTITLE AND LEARN MORE BUTTON 
          */
        }
          <LandingTitle variant="h2"
            gutterBottom
          >
            The Implications of the COVID-19 Pandemic in Indiana
          </LandingTitle>
          <Grid container direction={mobile ? "column" : "row"} justify={mobile ? "center" : "center"} alignItems="center" style={{width:'100%'}}>
            <Grid item lg={2} md={2} xl={12}>
              <SquareButton variant="outlined" color="inherit" size="medium">
                Health Equity
              </SquareButton>
            </Grid>
            <Grid item lg={2} md={2} xl={12}>
              <SquareButton variant="outlined" color="inherit" size="medium">
                Stay Healthy
              </SquareButton>
            </Grid>
            <Grid item lg={2} md={2} xl={12}>
              <SquareButton variant="outlined" color="inherit" size="medium">
                More Info
              </SquareButton>
            </Grid>
          </Grid>
          {mobile ? ' ' :
          <hr style={{color: 'inherit', opacity: 0.8}}></hr>
          }
          <br></br>
          {
          /* 
            LANDING CHART AND MAP | SET TO BE 60% OF THE VIEW HEIGHT
          */
          }
          <Grid container
            direction="row"
            alignItems={mobile? "flex-start" : "stretch"}
            justify={mobile || iPad ? "center" : "center"}
            spacing={mobile ? 2 : 4}
            style={{height: mobile ? '' : iPad ? '' : iPadPro ? '45vh' : '60vh', paddingBottom: mobile || iPad ? '10px' : 0}}
            >
          <Grid item lg={6} md={6} s={5} xs={!mobile ? 6 : 12}>
            <LandingChart
              dates={dates}
              data={covidHistoric}
            />
          </Grid>
          <Grid item lg={6} md={6} s={5} xs={!mobile ? 6 : 12}>
            <LandingMap 

            />
          </Grid>
          </Grid>
          {
          /* 
          LANDING INFO CARDS - SET TO BE 20% OF THE VIEW HEIGHT 
          */
        }
          <Grid container
            direction="row"
            alignItems={mobile || iPad ? "flex-start" : "center"}
            justify={mobile || iPad ? "center" : "center"}
            spacing={mobile ? 3 : 4}
            style={{width: mobile ? '100%' : '', height: mobile || iPad ? '' : '20vh'}}
          >
          <Grid item lg={3} md={3} s={3} xs={!mobile ? 5 : 12}>
          <InfoCard
            color="#a00000"
            title="No. of Cases:"
            data={covidNow.positive}
            daily={covidHistoric.casesToday}
            moreInfo={<MoreInfo>The running total of positive SARS-CoV-2 cases</MoreInfo>}
          > 
          </InfoCard>
          </Grid>
          <Grid item lg={3} md={3} s={3} xs={!mobile ? 5 : 12}>
          <InfoCard
            color="#005fb8"
            title="No. Tested:"
            data={covidNow.total}
            daily={covidHistoric.testedToday}
            moreInfo={<MoreInfo>The running total of persons tested for SARS-CoV-2 cases</MoreInfo>}
          >
          </InfoCard>
          </Grid>
          <Grid item lg={3} md={3} s={3} xs={!mobile ? 5 : 12}
          >
            <InfoCard 
              color="green"
              title="No. Deaths:"
              data={covidNow.deathConfirmed}
              daily={covidHistoric.deathToday}
              moreInfo={<MoreInfo>The running total of persons who have died in relation to contracting SARS-CoV-2</MoreInfo>}
            >  
             </InfoCard>
          </Grid>
          <Grid item lg={3} md={3} s={3} xs={!mobile ? 5 : 12}
          >
            <InfoCard 
              color="green"
              title="No. Hospitalized:"
              data={covidNow.hospitalized}
              daily={covidNow.hospitalizedIncrease}
              moreInfo={<MoreInfo>The running total of persons who have been hospitalized in relation to contracting SARS-CoV-2</MoreInfo>}
            >  
             </InfoCard>
          </Grid>
          </Grid>
        </Wrapper>
        </>
    )}
    else{
      return(<> </>)
    }

}

export default Landing;