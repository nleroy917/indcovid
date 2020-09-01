import React, {useState, useEffect, useRef} from "react";
import styled from 'styled-components';

import Loader from '../components/loader';
import Layout from "../components/layout";
import SEO from "../components/seo";
import Landing from '../components/landing';
import DisparitiesMap from '../components/disparitiesmap';
import SectionTitle from '../components/sectiontitle';
import SectionSubTitle from '../components/sectionsubtitle';
import SectionContent from '../components/sectioncontent';

import InfoTip from '../components/infotip';
import PageFooter from '../components/footer';
import RaceChart from '../components/racechart';
import CovidRaceChart from '../components/casesracechart';
import CovidEthnicityChart from '../components/ethnicitycasechart';
import RaceAgeChart from '../components/raceagechart';
import HealthCareAccess from '../components/healthcareaccess';
import MentalHealthGraph from '../components/mentalhealthgraph';

import {
  Grid,
  useMediaQuery
} from '@material-ui/core';

import axios from 'axios';

import balance from '../images/balance-scale.png';

const COVID_19_API_NOW = 'https://api.covidtracking.com/api/v1/states/in/current.json'
const COVID_19_API_HISTORIC = 'https://api.covidtracking.com/api/v1/states/in/daily.json'
const API_URL = 'https://indianacovid-api.herokuapp.com/'
// const API_URL = 'http://localhost:5000'

const InlineLink = styled.a`
    color: rgba(75,192,192,0.9);
`

const Img = styled.img`
    height: 230px;
    width: auto;
    overflow: cover;
    margin-left: 10px;
    margin-right: 10px;
    padding: 20px;
`

const scrollToHealth = (ref) => window.scrollTo(0, ref.current.offsetTop)

const IndexPage = () => {

    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });

    const healthRef = useRef(null);
    const executeScroll = () => scrollToHealth(healthRef)

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
    const [covidNow, setCovidNow] = useState(0);
    const [covidHistoric, setCovidHistoric] = useState([]);
    const [dates, setDates] = useState([]);
    const [yeetedData, setYeetedData] = useState(null);
    const [racePct, setRacePct] = useState([]);
    const [raceLabels, setRaceLabels] = useState([]);
    const [ethnicityPct, setEthnicityPct] = useState([]);
    const [ethnicityLabels, setEthnicityLabels] = useState([]);
    const [covidEthnicityPct, setCovidEthnicityPct] = useState([]);
    const [covidEthnicityLabels, setCovidEthnicityLabels] = useState([]);
    const [covidRacePct, setCovidRacePct] = useState([]);
    const [covidRaceLabels, setCovidRaceLabels] = useState([]);
    const [covidRaceAgeData, setCovidRaceAgeData] = useState([]);
    const [covidRaceAgeLabels, setCovidRaceAgeLabels] = useState([]);
    const [anxiety, setAnxiety] = useState([]);
    const [depression, setDepression] = useState([]);
    const [anxiety_depression, setAnxietyDepression] = useState([]);
    const [weeks, setWeeks] = useState([]);
    const [delayed, setDelayed] = useState([]);
    const [didNotGet, setDidNotGet] = useState([]);
    const [both, setBoth] = useState([]);

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

  const fetchIndianaRace = async () => {
    const res = await axios.get(`${API_URL}/data/indiana/demographics`)
    if(res.status === 200) {
      let data = res.data
      // console.log(data)
      setRacePct(data.race_percentages)
      setRaceLabels(data.race_labels)
      setEthnicityPct(data.ethnicity_percentages)
      setEthnicityLabels(data.ethnicity_labels)
    }
  }

  const fetchCOVIDRace = async () => {
    const res = await axios.get(`${API_URL}/data/covid/demographics`)
    if(res.status === 200) {
      let data = res.data
      // console.log(data)
      setCovidRacePct(data.COVID_COUNT_PCT_RACE)
      setCovidRaceLabels(data.race_labels)
      setCovidEthnicityPct(data.COVID_COUNT_PCT_ETHNICITY)
      setCovidEthnicityLabels(data.ethnicity_labels)
    }
  }

  const fetchCOVIDRaceAge = async () => {
    const res = await axios.get(`${API_URL}/data/covid/cdc-demographics-death`)
    if(res.status === 200) {
      let data = res.data
      // console.log(data)
      setCovidRaceAgeData(data.race_age_data)
      setCovidRaceAgeLabels(data.ages)
    }
  }

  const fetchHealthCareAccess = async () => {
    const res = await axios.get(`${API_URL}/data/covid/access-to-care`)
    if(res.status === 200) {
      let data = res.data
      // console.log(data)
      setWeeks(data.weeks)
      setDelayed(data.delayed)
      setDidNotGet(data.did_not_get)
      setBoth(data.both)
    }
  }

  const fetchMentalHealth = async () => {
    const res = await axios.get(`${API_URL}/data/covid/mental-health`)
    if(res.status === 200) {
      let data = res.data
      // console.log(data)
      setAnxiety(data.anxiety)
      setDepression(data.depression)
      setAnxietyDepression(data.depression_anxiety)
    }
  }

  useEffect(() => {
      fetchCovidNow()
      fetchCovidHistoric()
      yeetCovidData()
      fetchIndianaRace()
      fetchCOVIDRace()
      fetchCOVIDRaceAge()
      fetchHealthCareAccess()
      fetchMentalHealth()
  }, [])

  if (covidNow && yeetedData) {
    return(
    <Layout
       smoothScroll={scrollToHealth}
    >
      <SEO title="Home" />
        <Landing
          dates={dates}
          yeetedData={yeetedData}
          covidNow={covidNow}
          covidHistoric={covidHistoric}
          smoothScroll={executeScroll}
        />
        <br></br>
        <div
          ref={healthRef}
        >
        <SectionTitle
          textAlign="center"  
        >
          Health Equity
        </SectionTitle>
        </div>
        <br></br>
        <SectionSubTitle
          textAlign={mobile ? "center" : "left"}
        >
          What is a Health Disparity
        </SectionSubTitle>
        <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "flex-start"}
          style={{width: '100%'}}
          >
            <Grid item lg={6} md={12} xs={12}>
              <SectionContent
                textAlign="left"
              >
              {
                <p>
                  The Department of Health and Human Services(HHS)’s <InlineLink href="https://www.healthypeople.gov/2020/about/  %20%20foundation-health-measures/Disparities">Healthypeople2020.gov</InlineLink> defines a health disparity as “a particular type of  health difference that is closely linked with social, economic, and/or environmental disadvantage. Health disparities adversely affect   groups of people who have systematically experienced greater obstacles to health based on their racial or ethnic group; religion;   socioeconomic status; gender; age; mental health; cognitive, sensory, or physical disability; sexual orientation or gender identity;  geographic location; or other characteristics historically linked to discrimination or exclusion.”<sup><InlineLink href="http://www.minorityhealth.hhs.gov/npa/templates/browse.aspx?&lvl=2&lvlid=34.">1.</InlineLink></sup>
                </p>
              }
              </SectionContent>
              <SectionContent>
              {
              <p>
                The COVID-19 pandemic has presented a unique situation where can see throughout Indiana how a widespread disease is affecting populations  that are historically subject to disparities in healthcare. The Department of Health and Human Services believes one of the actionable methods we can use to close these disparities is first measuring the “disparities in health status, health care, and the physical and social  determinants of health-especially in relation to institutional policies and practices. '' HHS believes that if we hope to achieve health equity it would require measuring these changes.
              </p>
              }
              </SectionContent>
            </Grid>
            <Grid item lg={6} md={12} xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <iframe 
                id="healthdisparitiesframe" 
                width="100%" 
                src="https://www.healthypeople.gov/hdwidget/embed" 
                name="healthdisparitiesframe" 
                title="Health Disparities widget" 
                scrolling="no" 
                style={{border: 'none'}}
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Grid>
          </Grid>
          <br></br>
          <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "flex-start"}
          style={{width: '100%'}}
          >
            <Grid item lg={6} md={6}  xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              
            <Img src={balance} />

            </Grid>
            <Grid item lg={6} md={6}  xs={12}>
            <SectionSubTitle
            textAlign={mobile ? "center" : "center"}
            >
          What is Health Equity?
        </SectionSubTitle>
              <SectionContent>
              {
                <p>
                The Department of Health and Human Services Healthypeople2020.gov defines health equity as “attainment of the highest level of health for all people. Achieving health equity requires valuing everyone equally with focused and ongoing societal efforts to address avoidable inequalities, historical and contemporary injustices, and the elimination of health and health care disparities.”<sup><InlineLink href="http://www.healthypeople.gov/sites/default/files/PhaseI_0.pdf.">2.</InlineLink></sup>
                </p>
              }
              </SectionContent>
          </Grid>
          </Grid>
          <br></br>
          <SectionTitle
          textAlign="center"  
        >
          Race
        </SectionTitle>
        <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "flex-start"}
          style={{width: '100%'}}
          >
          <Grid item lg={12} md={12} xs={12}>
          <SectionContent>
                loremAute Lorem ut id Lorem et ad deserunt aliqua eiusmod sit fugiat laboris culpa. Officia adipisicing ex do exercitation. Velit elit aliquip sint elit sit aliquip mollit quis culpa ut reprehenderit. Est Lorem labore adipisicing occaecat. Qui aliqua veniam tempor enim proident dolor duis reprehenderit elit deserunt sit minim qui do. Elit officia ut adipisicing nulla reprehenderit consequat non nostrud ullamco. Exercitation exercitation do mollit reprehenderit proident veniam eiusmod pariatur reprehenderit aliqua sint est.
                </SectionContent>
          </Grid>
          </Grid>
          <br></br>
          <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "flex-start"}
          style={{width: '100%'}}
          >
            <Grid item lg={6} md={6} xs={12}>
            <CovidRaceChart
                indiana_data={racePct}
                covid_data={covidRacePct}
                labels={covidRaceLabels}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <CovidEthnicityChart
                indiana_data={ethnicityPct}
                covid_data={covidEthnicityPct}
                labels={covidEthnicityLabels}
              />
            </Grid>
          </Grid>
          <br></br>
          <SectionContent>
                loremAute Lorem ut id Lorem et ad deserunt aliqua eiusmod sit fugiat laboris culpa. Officia adipisicing ex do exercitation. Velit elit aliquip sint elit sit aliquip mollit quis culpa ut reprehenderit. Est Lorem labore adipisicing occaecat. Qui aliqua veniam tempor enim proident dolor duis reprehenderit elit deserunt sit minim qui do. Elit officia ut adipisicing nulla reprehenderit consequat non nostrud ullamco. Exercitation exercitation do mollit reprehenderit proident veniam eiusmod pariatur reprehenderit aliqua sint est.
          </SectionContent>
          <br></br>
          <div>
          <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "center"}
          style={{width: '100%', height: '100%'}}
          >
          <Grid item xs={12} lg={12} md={12} style={{height: '50vh'}}>
            <RaceAgeChart
              data={covidRaceAgeData}
              labels={covidRaceAgeLabels}
            />
          </Grid>
          </Grid>
          </div>
          <br></br>
          <SectionTitle
            textAlign="center"  
          >
          Access to Health Care
        </SectionTitle>
        <SectionContent>
                loremAute Lorem ut id Lorem et ad deserunt aliqua eiusmod sit fugiat laboris culpa. Officia adipisicing ex do exercitation. Velit elit aliquip sint elit sit aliquip mollit quis culpa ut reprehenderit. Est Lorem labore adipisicing occaecat. Qui aliqua veniam tempor enim proident dolor duis reprehenderit elit deserunt sit minim qui do. Elit officia ut adipisicing nulla reprehenderit consequat non nostrud ullamco. Exercitation exercitation do mollit reprehenderit proident veniam eiusmod pariatur reprehenderit aliqua sint est. loremAute Lorem ut id Lorem et ad deserunt aliqua eiusmod sit fugiat laboris culpa. Officia adipisicing ex do exercitation. Velit elit aliquip sint elit sit aliquip mollit quis culpa ut reprehenderit. Est Lorem labore adipisicing occaecat. Qui aliqua veniam tempor enim proident dolor duis reprehenderit elit deserunt sit minim qui do. Elit officia ut adipisicing nulla reprehenderit consequat non nostrud ullamco. Exercitation exercitation do mollit reprehenderit proident veniam eiusmod pariatur reprehenderit aliqua sint est.
          </SectionContent>
          <br></br>
        <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "flex-start"}
          style={{width: '100%'}}
          >
            <Grid item lg={6} md={6} xs={12}>
              <HealthCareAccess
                weeks={weeks}
                delayed={delayed}
                didNotGet={didNotGet}
                both={both}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>

            </Grid>
            </Grid>
            <br></br>
          <SectionTitle
            textAlign="center"  
          >
          Mental Health
        </SectionTitle>
        <SectionContent>
          During a global pandemic it is easy to focus all of our attention on our physical health. However, often forgotten is how our mental health may be affected by a global pandemic such as this. Fear and anxiety over a novel virus can cause a lot of overwhelming stress in both adults and adolescents. In addition, public health measures taken such as social distaning and isolation only further perpetuate these feelings of anxiety, depression, and lonliness. Taking care of one's mental health should be taken just as seriously as one's physical health in a time such as this.
        </SectionContent>
        <SectionContent>
          Since the onset of the pandemic - especially in recent weeks - counts of depression and anxiety have steadily increased over time. As the country takes more and more time to socially distance, these problems will only get worse. In addition, health disparities we present on this site are present in the context of mental health as well. Historically marginalized groups who are systematically experiencing greater obstacles to health based on their racial or ethnic group are also experiencing these problems with mental health care. In 2001 the Federal Collaborative for Health Disparities Research chose mental health disparity as one of four topics warranting its immediate national research attention. Unequal access to resources like remote therapy, support groups, and counciling perpetuates the onset of mental and subsquent physical health inequities as well. 
        </SectionContent>
          <br></br>
          <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "flex-start"}
          style={{width: '100%'}}
          >
            <Grid item lg={6} md={6} xs={12}>

            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <MentalHealthGraph
                anxiety={anxiety}
                depression={depression}
                both={anxiety_depression}
                weeks={weeks}
              />
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
