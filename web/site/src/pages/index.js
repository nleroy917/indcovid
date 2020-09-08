import React, {useState, useEffect, useRef} from "react";
import styled from 'styled-components';

import Loader from '../components/loader';
import Layout from "../components/layout";
import SEO from "../components/seo";
import Landing from '../components/landing';
import SectionTitle from '../components/sectiontitle';
import SectionSubTitle from '../components/sectionsubtitle';
import SectionContent from '../components/sectioncontent';

import PageFooter from '../components/footer';
import CovidRaceChart from '../components/casesracechart';
import DeathRateRaceChart from '../components/deathrateracechart';
import CovidEthnicityChart from '../components/ethnicitycasechart';
import DeathRateEthnicityChart from '../components/deathrateethnicitychart';
import RaceAgeChart from '../components/raceagechart';
import HealthCareAccess from '../components/healthcareaccess';
import MentalHealthGraph from '../components/mentalhealthgraph';
import InfoCard from '../components/infocard';
import RaceMap from '../components/racemap';
import SocialVulnerabilityMap from "../components/socialvulnerabilitymap";

import {
  Grid,
  useMediaQuery
} from '@material-ui/core';

import axios from 'axios';

import balance from '../images/balance-scale.png';

const COVID_19_API_NOW = 'https://api.covidtracking.com/api/v1/states/in/current.json'
const COVID_19_API_HISTORIC = 'https://api.covidtracking.com/api/v1/states/in/daily.json'
const API_URL = process.env.GATSBY_API_URL

const InlineLink = styled.a`
    color: rgba(75,192,192,0.9);
`

const Img = styled.img`
    height: 350px;
    width: auto;
    overflow: cover;
    margin-left: 10px;
    margin-right: 10px;
    padding: 20px;
`

const MoreInfo = styled.span`
  font-size: 0.8rem;
  padding: 4px;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const RoundedButton = styled.a`
    appearance: button;
    text-decoration: none;
    margin: 15px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background: white;
    border: none;
    color: #3b9090;
    border: #3b9090 solid 1px;
    font-family: inherit;
    font-size: 1.00rem;
    transition: ease-in 0.15s;
    border-radius: 30px;
    
    &:hover {
        background: #3b9090;
        color: white;
        border: rgba(0,0,0,0) solid 1px;
        cursor: pointer;
    }
    &:active {
        background: #e6e6e6;
        color: rgba(1,1,1,0.6);
        border: rgba(1,1,1,0.6) solid 2px; 
        transition: 0.4s;
    }
    &:focus {
        outline: none;
    }
`

const SocialVulnerabilityMapWrapper = styled.div`
width: 50%;
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
    const [covidDeathRateRace, setCovidDeathRateRace] = useState([]);
    const [covidDeathRateEthnicity, setCovidDeathRateEthnicity] = useState([]);
    const [covidRaceLabels, setCovidRaceLabels] = useState([]);
    const [covidRaceAgeData, setCovidRaceAgeData] = useState([]);
    const [covidRaceAgeLabels, setCovidRaceAgeLabels] = useState([]);
    const [anxiety, setAnxiety] = useState([]);
    const [depression, setDepression] = useState([]);
    const [anxiety_depression, setAnxietyDepression] = useState([]);
    const [weeks, setWeeks] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
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

  const movingAverage = (someArray) => {
    let movingAverageArray = []
    for(let i = 0; i < someArray.length; i++) {

      if (i < 7) {
        movingAverageArray.push(0)
      } else {
        movingAverageArray.push(((someArray[i] + someArray[i-1] + someArray[i-2] + someArray[i-3] + someArray[i-4] + someArray[i-5] + someArray[i-6]) / 7).toFixed(2))
      }
    }
    return movingAverageArray
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
        positivity: [],
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
          data_point.hospitalizedIncrease < 0 ? 0 : data_point.hospitalizedIncrease
        )
        historic_data_full.tests.push(
          data_point.totalTestResultsIncrease
        )
        historic_data_full.positivity.push(
          (data_point.positiveIncrease / data_point.totalTestResultsIncrease) * 100
        )
      }
      historic_data_full.hospitalized = removeOutliers(historic_data_full.hospitalized)
      historic_data_full.recovered = cumulativeToDaily(historic_data_full.recovered)
      historic_data_full.positivity = movingAverage(historic_data_full.positivity)
      setCovidHistoric(historic_data_full)
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
      console.log(data)
      setCovidRacePct(data.COVID_COUNT_PCT_RACE)
      setCovidRaceLabels(data.race_labels)
      setCovidDeathRateRace(data.COVID_DEATHS_PCT_RACE)
      setCovidEthnicityPct(data.COVID_COUNT_PCT_ETHNICITY)
      setCovidDeathRateEthnicity(data.COVID_DEATHS_PCT_ETHNICITY)
      setCovidEthnicityLabels(data.ethnicity_labels)
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
      setWeekDates(data.week_dates)
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
      fetchIndianaRace()
      fetchCOVIDRace()
      fetchHealthCareAccess()
      fetchMentalHealth()
  }, [])
  
  if (covidNow && covidHistoric) {
    return(
    <Layout
       smoothScroll={scrollToHealth}
    >
      <SEO 
        title="Home"
        description="In this research, we take the time to analyze and invstigate how people from under-privileged communities are disproportionately affected by the COVID-19 pandemic."
        lang="en"
        meta="Indiana COVID-19 & Health Equity"
      />
        <Landing
          dates={dates}
          yeetedData={yeetedData}
          covidNow={covidNow}
          covidHistoric={covidHistoric}
          smoothScroll={executeScroll}
          equityRef={healthRef}
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
        <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "flex-start"}
          style={{width: '100%', height: '100%'}}
          >
            <Grid item lg={6} md={12} xs={12}>
            <SectionSubTitle
              textAlign="center"
            >
              What is a Health Disparity
            </SectionSubTitle>
              <SectionContent
                textAlign="left"
              >
              {
                <p>
                  The Department of Health and Human Services(HHS)’s <InlineLink href="https://health.gov/healthypeople">Health.gov</InlineLink> defines a health disparity as “a particular type of health difference that is closely linked with social, economic, and/or environmental disadvantage. Health disparities adversely affect groups of people who have systematically experienced greater obstacles to health based on their racial or ethnic group; religion; socioeconomic status; gender; age; mental health; cognitive, sensory, or physical disability; sexual orientation or gender identity; geographic location; or other characteristics historically linked to discrimination or exclusion.”<sup><InlineLink href="http://www.minorityhealth.hhs.gov/npa/templates/browse.aspx?&lvl=2&lvlid=34.">1.</InlineLink></sup>
                </p>
              }
              </SectionContent>
              <SectionContent>
              {
              <p>
                The COVID-19 pandemic has presented a unique situation where can see throughout Indiana how a widespread disease is affecting populations that are historically subject to disparities in healthcare. The Department of Health and Human Services believes one of the actionable methods we can use to close these disparities is first measuring the “disparities in health status, health care, and the physical and social determinants of health-especially in relation to institutional policies and practices. '' HHS believes that if we hope to achieve health equity it would require measuring these changes.
              </p>
              }
              </SectionContent>
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
              <RaceMap />
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
            {
              mobile ?  '' :
              <Img src={balance} />
            }
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
                The Department of Health and Human Services Healthypeople2020.gov defines health equity as “attainment of the highest level of health for all people. Achieving health equity requires valuing everyone equally with focused and ongoing societal efforts to address avoidable inequalities, historical and contemporary injustices, and the elimination of health and health care disparities.”<sup><InlineLink href="https://www.healthypeople.gov/2020/about/foundation-health-measures/Disparities#5">2.</InlineLink></sup>
                </p>
              }
              </SectionContent>
          </Grid>
          </Grid>
          <br></br>
          <SectionTitle
            textAlign="center"  
          >
            Race & Ethnicity
          </SectionTitle>
          <Grid container
            direction="row"
            alignItems="center"
            justify={mobile ? "center" : "flex-start"}
            style={{width: '100%'}}
          >
          <Grid item lg={12} md={12} xs={12}>
          <SectionContent>
          {
            <>
              Race and ethnicity are often a focus when attempting to bring health dipartites and achieve health equity. Race and ethnicity themselves are simply “socially constructed categories that have tangible effects on the lives of individuals who are defined by how one perceives one's self and how one is perceived by others.” Still, race and ethnicity serve an important role in understanding how large clusters of populations are being treated within the medical system. Racial and ethnic minorities suffer higher rates of “health disparities [which] take on many forms, including higher rates of chronic disease and premature death compared to the rates among whites.” <sup><InlineLink href="https://www.ncbi.nlm.nih.gov/books/NBK425844/">4.</InlineLink></sup> The following visuals help illustrate the current disparity in Covid-19 cases numbers and death rates in Indiana.
            </>
          }
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

          <div>
          <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "center"}
          style={{width: '100%'}}
          >
            <Grid item lg={10} md={10} xs={12}>
            <DeathRateRaceChart
                indiana_data={racePct}
                covid_data={covidDeathRateRace}
                labels={covidRaceLabels}
              />
            </Grid>
          </Grid>
          </div>
          <br></br>
          <SectionTitle
            textAlign="center"
          >
            Social Vulnerability Index
          </SectionTitle>
          <SectionSubTitle
            fontWeight={300}
            textAlign="center"
          >
            Total Covid-19 Cases Per County
          </SectionSubTitle>
          <br></br>
          <SectionContent>
          The <InlineLink href="https://svi.cdc.gov/">Social Vulnerability Index (SVI)</InlineLink> uses U.S. Census data to determine the social vulnerability of every county and tract. CDC SVI ranks each county and tract on 15 social factors, including poverty, lack of vehicle access, and crowded housing, and groups them into four related themes:
          {
          <ul>
            <li>Socioeconomic</li>
            <li>Housing Composition and Disability</li>
            <li>Minority Status and Language</li>
            <li>Housing and Transportation </li>
          </ul>
          }
          The CDC ranked counties and tracts for the entire United States against one another. Percentile ranking values range from 0 to 1, with higher values indicating greater vulnerability. For each county and tract, the CDC generated its percentile rank among all counties and tracts for:
          {
          <ol>
            <li>The fifteen  individual variables</li>
            <li>The four themes</li>
            <li>Its overall position.</li>
          </ol>
          }   
          </SectionContent>
          <br></br>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <SocialVulnerabilityMapWrapper>
            <SocialVulnerabilityMap />
          </SocialVulnerabilityMapWrapper>
          </div>
          <br></br>
          <br></br>
          <SectionContent>
            Evaluating the coronavirus cases versus the vulnerability index illustrates a dynamic picture how specific demographic population are facing the virus. When we see the role socioeconomic, racial & ethnic, as well as the 15 other social factors play correlated to covid-cases we can better understand who in fact is contracting the virus and other factors which could be influencing not only their likeliness to get the virus but their also their medical outcomes.
          </SectionContent>
          <br></br>
          <br></br>
          <SectionTitle
            textAlign="center"  
          >
          Access to Healthcare
        </SectionTitle>
        <SectionContent>
          General access to health care statistics help us paint a picture of how many people are getting treatment during the pandemic. Insights from this data can lead to further understanding in the future of what groups (racial & ethnic groups, persons with various insurance types…etc.) are within the people who didn’t get medical care or were delayed in getting care. Programs to expand the access to medical care like the <InlineLink href="https://www.in.gov/fssa/hip/">Healthy Indiana Plan</InlineLink> and evaluating the efficacy of such programs in the midst of a pandemic could serve as a “stress test” in understanding how to improve such programs in the future.
          </SectionContent>
          <br></br>
        <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "space-between"}
          style={{width: '100%'}}
          >
            <Grid item lg={6} md={6} xs={12}>
              <HealthCareAccess
                weeks={weeks}
                weekDates={weekDates}
                delayed={delayed}
                didNotGet={didNotGet}
                both={both}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={10}> 
              <InfoCard
                title="Delayed Medical Care"
                units="%"
                data={delayed[delayed.length - 1]}
                moreInfo={<MoreInfo>Delayed or Did Not Get Health Care. Housing units linked to one or more email addresses or cell phone numbers were randomly selected to participate, and one respondent from each housing unit was selected to respond for him or herself. Estimates are weighted to adjust for nonresponse and to match Census Bureau estimates of the population by age, gender, race and ethnicity, and educational attainment.</MoreInfo>}
              />
              <br></br>
              <InfoCard
                title="Did Not Get Medical Care"
                units="%"
                data={didNotGet[didNotGet.length - 1]}
                moreInfo={<MoreInfo>Delayed or Did Not Get Health Care. Housing units linked to one or more email addresses or cell phone numbers were randomly selected to participate, and one respondent from each housing unit was selected to respond for him or herself. Estimates are weighted to adjust for nonresponse and to match Census Bureau estimates of the population by age, gender, race and ethnicity, and educational attainment.</MoreInfo>}
              />
            </Grid>
            </Grid>
            <br></br>
          <SectionTitle
            textAlign="center"  
          >
          Mental Health
        </SectionTitle>
        <SectionContent>
        During a global pandemic it is easy to focus all of our attention on our physical health. However, often forgotten is how our mental health may be affected by a global pandemic such as this. Fear and anxiety over a novel virus can cause a lot of overwhelming stress in both adults and adolescents. In addition, public health measures taken such as social distancing and isolation only further perpetuate these feelings of anxiety, depression, and loneliness. Taking care of one's mental health should be taken just as seriously as one's physical health in a time such as this.
        </SectionContent>
        <br></br>
        <SectionContent>
        Since the onset of the pandemic - especially in recent weeks - counts of depression and anxiety have steadily increased over time. As the country takes more and more time to socially distance, these problems will only get worse. In addition, health disparities we present on this site are present in the context of mental health as well. Historically marginalized groups who are systematically experiencing greater obstacles to health based on their racial or ethnic group are also experiencing these problems with mental health care. In 2001 the Federal Collaborative for Health Disparities Research chose mental health disparity as one of four topics warranting its immediate national research attention. Unequal access to resources like remote therapy, support groups, and counseling perpetuates the onset of mental and subsequent physical health inequities as well.
        </SectionContent>
          <br></br>
          <Grid container
          direction="row"
          alignItems="center"
          justify={mobile ? "center" : "space-between"}
          style={{width: '100%'}}
          >
            <Grid item lg={4} md={4} xs={10}>
            <InfoCard
                title="Experiencing Anxiety"
                units="%"
                data={anxiety[anxiety.length - 1]}
                moreInfo={<MoreInfo>Housing units linked to one or more email addresses or cell phone numbers were randomly selected to participate, and one respondent from each housing unit was selected to respond for him or herself. Estimates are weighted to adjust for nonresponse and to match Census Bureau estimates of the population by age, gender, race and ethnicity, and educational attainment.</MoreInfo>}
              />
              <br></br>
              <InfoCard
                title="Experiencing Depression"
                units="%"
                data={depression[depression.length - 1]}
                moreInfo={<MoreInfo>Housing units linked to one or more email addresses or cell phone numbers were randomly selected to participate, and one respondent from each housing unit was selected to respond for him or herself. Estimates are weighted to adjust for nonresponse and to match Census Bureau estimates of the population by age, gender, race and ethnicity, and educational attainment.</MoreInfo>}
              />
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
