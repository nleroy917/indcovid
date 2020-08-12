import React, {useState, useEffect} from "react";
import styled from 'styled-components';

import Loader from '../components/loader';
import Layout from "../components/layout";
import SEO from "../components/seo";
import Landing from '../components/landing';
import DisparitiesMap from '../components/disparitiesmap';
import SectionTitle from '../components/sectiontitle';
import SectionSubTitle from '../components/sectionsubtitle';
import SectionContent from '../components/sectioncontent';

import PageFooter from '../components/footer';

import {
  Grid,
  useMediaQuery
} from '@material-ui/core';

import axios from 'axios';

const COVID_19_API_NOW = 'https://covidtracking.com/api/v1/states/in/current.json'
const COVID_19_API_HISTORIC = 'https://covidtracking.com/api/v1/states/in/daily.json'
const API_URL = 'https://indianacovid-api.herokuapp.com/'

const InlineLink = styled.a`
    color: rgba(75,192,192,0.9);
`

const IndexPage = () => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
    const [covidNow, setCovidNow] = useState(0);
    const [covidHistoric, setCovidHistoric] = useState([]);
    const [dates, setDates] = useState([]);
    const [yeetedData, setYeetedData] = useState(null);

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

  if (covidNow && yeetedData) {
    return(
    <Layout>
      <SEO title="Home" />
        <Landing
          dates={dates}
          yeetedData={yeetedData}
          covidNow={covidNow}
          covidHistoric={covidHistoric}
        />
        <SectionTitle
          textAlign="center"
        >
          Health Equity
        </SectionTitle>
        <br></br>
        <SectionSubTitle>
          What is a health disparity?
        </SectionSubTitle>
        <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "flex-start"}
          style={{width: '100%'}}
          >
            <Grid item lg={12} xs={12}>
              <SectionContent
                 textAlign="left"
              >
              {<p>The Department of Health and Human Services (HHS)’s <InlineLink href="https://www.healthypeople.gov/2020/about/  foundation-health-measures/Disparities">Healthypeople2020.gov</InlineLink> defines a health disparity as “a particular type of health   difference that is closely linked with social, economic, and/or environmental disadvantage. Health disparities adversely affect groups  of people who have systematically experienced greater obstacles to health based on their racial or ethnic group; religion;   socioeconomic status; gender; age; mental health; cognitive, sensory, or physical disability; sexual orientation or gender identity;  geographic location; or other characteristics historically linked to discrimination or exclusion.”</p>}
              </SectionContent>
              <SectionContent>
              The COVID-19 pandemic has presented a unique situation where can see throughout Indiana how a widespread disease is effecting   populations that are historically subject to disparities in healthcare. The Department of Health and Human Services believes one of the   actionable methods we can use to close these disparities is first measuring the “disparities in health status, health care, and the   physical and social determinants of health-especially in relation to institutional policies and practices. “ HHS believes that if we  hope to achieve health equity it would require measuring these changes.
              </SectionContent>
            </Grid>
          </Grid>
      <PageFooter />
    </Layout>
    )
  } else {
      return(
       <>
        <Loader
         size={200}
        />
       </>
    );
  }
}

export default IndexPage
