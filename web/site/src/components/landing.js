import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import axios from 'axios';

import {
    Typography,
    Grid,
    useMediaQuery
} from '@material-ui/core';


import InfoCard from '../components/infocard';
import LandingChart from '../components/landingchart';

const COVID_19_API_NOW = 'https://covidtracking.com/api/v1/states/in/current.json'
const COVID_19_API_HISTORIC = 'https://covidtracking.com/api/v1/states/in/daily.json'

const Wrapper = styled.div`
    height: 70vh;
    @media (max-width: 768px) {
    height: none;
  }

`

const MapWrapper = styled.div`
  position: relative; 
  padding-bottom: 80%; 
  height: 0; 
  max-width: 100%;  small{position: absolute; z-index: 40; bottom: 0; margin-bottom: -15px;}</style>
`

const IFrame = styled.iframe`
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
`

const LandingTitle = styled(Typography)`
    font-weight: 400 !important;
    font-size: 2.2rem !important;

`

const Landing = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const [covidNow, setCovidNow] = useState(0);
    const [covidHistoric, setCovidHistoric] = useState([]);
    const [dates, setDates] = useState([]);
    const matches = useMediaQuery('(max-width:768px)');

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
          tests: []
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
            data_point.hospitalized
          )
          historic_data_full.tests.push(
            data_point.totalTestResultsIncrease
          )
        }
        setCovidHistoric(historic_data_full)
      }
    }

    useEffect(() => {
        fetchCovidNow()
        fetchCovidHistoric()
    }, [])

    return(
      covidNow ?
        <>
        <Wrapper>
          <LandingTitle variant="h2"
            gutterBottom
          >
            The Widespread Implications of the COVID-19 Pandemic in Indiana.
          </LandingTitle>
          <Grid container
            direction="row"
            alignItems={matches ? "flex-start" : "stretch"}
            justify={matches ? "center" : "space-between"}
            spacing={1}
            style={{width: '100%', height: '80%'}}
            >
          <Grid item lg={6} md={6} s={5} xs={10}>
            <LandingChart
              dates={dates}
              data={covidHistoric}
            />
          </Grid>
          <Grid item lg={6} md={6} s={5} xs={10}>
          {/* <MapWrapper class="embed-container">
            <IFrame 
              width="500" 
              height="400" 
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0" 
              title="indcovid" 
              src="//nleroy917.maps.arcgis.com/apps/Embed/index.html?webmap=2478c23728f24575a659ff0f8037a1a2&extent=-94.3558,36.4918,-76.0306,43.277&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=dark">

            </IFrame>
          </MapWrapper> */}
          </Grid>
          </Grid>
          <Grid container
            direction="row"
            alignItems={matches ? "flex-start" : "center"}
            justify={matches ? "center" : "space-between"}
            spacing={4}
            style={{width: '100%', height: '20%'}}
          >
          <Grid item lg={3} md={3} s={3} xs={10}>
          <InfoCard
            color="#a00000"
            title="No. of Cases:"
            data={covidNow.positive}
            moreInfo="The number of postive cases currently in Indiana."
          > 
          </InfoCard>
          </Grid>
          <Grid item lg={3} md={3} s={3} xs={10}>
          <InfoCard
            color="#005fb8"
            title="No. Tested:"
            data={covidNow.total}
            moreInfo="The number of tested people currently in Indiana."
          >
          </InfoCard>
          </Grid>
          <Grid item lg={3} md={3} s={3} xs={10}
          >
            <InfoCard 
              color="green"
              title="No. Recovered:"
              data={covidNow.recovered}
              moreInfo="The number of recovered people currently in Indiana."
            >  
             </InfoCard>
          </Grid>
          </Grid>
        </Wrapper>
        </>
        : ' ' 
    )

}

export default Landing;