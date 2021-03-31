import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from '../components/nav';

import VaccineTotals from '../components/vaccinetotals';
import VaccineTimeline from '../components/vaccinetimeline';

import {
    useMediaQuery,
    Typography,
    Grid
} from '@material-ui/core';
import SectionSubTitle from '../components/sectionsubtitle';

const API_URL = process.env.REACT_APP_API_URL

const PageTitle = styled(Typography)`
  font-weight: 400;
  font-size: 1.2rem;
  color: inherit;
  text-align: center;
`

const SectionTitle = styled(Typography)`
    font-weight: 400;
    color: inherit;
    font-size: 2.00rem !important;
    text-align: center;
`

const SectionContent = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
    font-weight: 300 !important;
`

const InlineLink = styled.a`
    color: rgba(75,192,192,0.9);
`

const NumList = styled.ol`
  font-weight: 400;
  font-size: 1.25rem;
`

const List = styled.ul`
  font-weight: 300;
`

const ListItem = styled.li`

`
const RoundedButton = styled.a`
    text-decoration: none;
    margin: 5px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background: white;
    border: none;
    color: #3b9090;
    border: #3b9090 solid 2px;
    font-family: inherit;
    font-size: ${props => props.mobile ? '0.75rem' : '1.00rem'};
    transition: ease-in 0.15s;
    border-radius: 30px;
    
    &:hover {
        background: #3b9090;
        color: white;
        border: rgba(0,0,0,0) solid 2px;
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

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${props => props.mobile ? 'column' : 'row'};
    justify-content: center;
    align-items: center;

`

const SectionWrapper = styled.div`
    border: solid white 1px;
    padding: 15px;
`

const ChartsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
`
const VaccinePage = () => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    const [vaccineData, setVaccineData] = useState(null)
    const fetchData = async () => {
        let res = await axios.get(`${API_URL}/data/covid/vaccines`)
        if(res.status === 200) {
            let data = res.data
            setVaccineData(data)
            console.log(data)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <>
        <Layout>
          <SEO 
            title="Vaccine" 
            description="In this research, we take the time to analyze and invstigate how people from under-privileged communities are disproportionately affected by the COVID-19 pandemic."
            lang="en"
            meta="Indiana COVID-19 & Health Equity"
         />
          {mobile ? '' : <Nav />}
          <br></br>
          {
          vaccineData ?
          <>
           <Grid container
            direction="row"
            alignItems={mobile ? "flex-start" : "stretch"}
            justify={mobile || iPad ? "center" : "center"}
            spacing={mobile ? 2 : 4}
            style={{height: '100%', paddingBottom: mobile || iPad ? '10px' : 0}}
            >
            <Grid item lg={6} md={6} s={5} xs={!mobile ? 6 : 12}>
                <VaccineTotals
                   first_dose_data={vaccineData.first_doses_to_date}
                   second_dose_data={vaccineData.second_doses_to_date}
                   labels={['Pfizer', 'Moderna', 'Total']}
                  />
            </Grid>
            <Grid item lg={6} md={6} s={5} xs={!mobile ? 6 : 12}>
                <VaccineTimeline
                  pfizer={vaccineData.pfizer_total_doses}
                  moderna={vaccineData.moderna_total_doses}
                  total={vaccineData.both_total_doses}
                  dates={vaccineData.dates}
                />
            </Grid>
          </Grid>
          <br></br>
          <SectionWrapper>
          <SectionTitle>
              Am I Eligble for a Vaccine?
          </SectionTitle>
          <SectionContent>
            If you answer yes to any of these questions, you are eligible to receive the COVID-19 vaccine:
          </SectionContent>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <List>
          <ListItem><b>Are you age 16 or older?</b></ListItem>
          <ListItem><b>Are you a teacher or part of an educational staff?</b></ListItem>
          <ListItem>
            <b>Do you work or volunteer in healthcare and have (physical or close) contact or face to face interactions with patients? Examples include:</b>
            <List>
                <ListItem>Inpatient, outpatient, provider office setting, nursing homes, residential care facilities, assisted living facilities, in-home services</ListItem>
                <ListItem>This includes all clinical and non-clinical positions: clinicians, dietary, environmental services, administrators who have direct contact with patients, clergy who see patients in the healthcare setting, non-clinicians who assist in procedures, transportation staff, etc.</ListItem>
                <ListItem>This also includes local health department staff who interact with patients at test sites, health clinics or provide direct patient care</ListItem>
            </List>
          </ListItem>
          <ListItem><b>Do you have exposure to COVID-19 infectious material? </b>(Examples include cleaning of rooms or material from COVID-19 patients, performing COVID-19 testing, other exposure to infected tissue, performing autopsies or other post-mortem examinations of COVID-19 patients)</ListItem>
          <ListItem><b>Are you a first responder </b>(fire, law enforcement, emergency medical services, reservists and volunteers)<b> who has contact with the public and could be called to the scene of an emergency?</b></ListItem>
        </List>
          </div>
          </SectionWrapper>
          <br></br>
          <SectionWrapper
          mobile={mobile}
        >
        <SectionTitle 
              gutterBottom 
              variant="h4"
        >
        Indiana's Vaccine Progress
        </SectionTitle>
        <SectionContent>
            The vaccination of Hoosiers against COVID-19 has begun. Any Hoosier age 70 and older is now eligible to schedule a vaccination appointment, as are long-term care residents, first responders (fire, law enforcement, emergency medical services, reservists and volunteers) who have in-person contact with the public and licensed and unlicensed healthcare workers who have in-person contact with patients or infectious material in any healthcare setting.
        </SectionContent>
        <br></br>
        <SectionContent>
        Hoosiers age 70 and older can schedule a vaccination at the link in the red bar above or by calling 2-1-1 if they do not have access to a computer or need assistance registering. Eligible professionals should receive an invitation and registration link from their employer, professional association, or the State of Indiana (Indiana Department of Health, Professional Licensing Agency, Family & Social Services Administration, Department of Homeland Security, or another state agency). If you are a licensed healthcare provider, make sure your email is updated with the Indiana Professional Licensing Agency and continue to check your email and SPAM. If you are eligible and haven’t received an invitation, please ask your employer.
        </SectionContent>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <RoundedButton
            href="https://experience.arcgis.com/experience/24159814f1dd4f69b6c22e7e87bca65b"
          >
            Schedule a Vaccine
          </RoundedButton>
          </div>
          </SectionWrapper>
          <br></br>
          <SectionWrapper>
              <SectionTitle gutterBottom={true}>
                  Vaccine Safety
              </SectionTitle>
              <SectionSubTitle>
                  <b>How was the vaccine evaluated for safety?</b>
              </SectionSubTitle>
              <SectionContent>
              New medications, vaccines (shots), and treatments may make you feel uncertain, but they are studied and evaluated with safety and effectiveness as the top priority. Vaccines (shots) undergo rigorous testing and must meet safety standards before being released. In addition to the clinical trials completed as part of the routine process, the vaccines (shots) will continue to be evaluated by the manufacturers and researchers over time in the real world. More information is available at <InlineLink href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety.html.">https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety.html</InlineLink>.
              </SectionContent>
              <br></br>
              <SectionSubTitle>
                  <b>Does this vaccine cause any serious side effects like infertility or autism?</b>
              </SectionSubTitle>
              <SectionContent>
              It has been scientifically proven that vaccines and vaccine ingredients do not cause or exacerbate autism or other developmental disabilities. There is no scientific or clinical evidence demonstrating that the COVID-19 vaccine will cause serious side effects. Some people may experience some discomfort in the days following their immunization. These discomforts can be an indication the body’s immune system is working with the vaccine to develop antibodies. These discomforts should only last a few days and may include:
                <List>
                <ListItem>Pain or redness where the shot was given</ListItem>
                <ListItem>Soreness in the arm where the shot was given</ListItem>
                <ListItem>Fatigue</ListItem>
                <ListItem>Chills</ListItem>
                <ListItem>Fever</ListItem>
                </List>
              </SectionContent>
              <SectionSubTitle>
                  <b>The vaccine was developed very quickly, how do we know what the long term effects are? </b>
              </SectionSubTitle>
              <SectionContent>
              Vaccines (shots) have been around for a long time, and the science used to create the COVID-19 vaccines (shots) has been studied for years. While the COVID-19 vaccine (shot) is new, the science used to create it is not. The COVID-19 vaccines (shots) have been thoroughly tested to make sure they are safe and effective. The <InlineLink href="https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/covid-19-vaccines">FDA</InlineLink> authorized the vaccine (shot) under an Emergency Use Authorization (EUA), meaning the vaccine (shot) was proven safe and effective. The vaccine (shot) would not be approved for use if it were harmful or unsafe.  The COVID-19 vaccines (shots) took much less time than normal to be released because they were made at the same time as they were being studied and approved, rather than afterward, to save time. They still had the same strict safety measures and reviews as usual. No steps were skipped or shortened.
              </SectionContent>
              <br></br>
              <SectionSubTitle>
                  <b>Has the vaccine been tested among all racial/ethnic groups?</b>
              </SectionSubTitle>
              <SectionContent>
              Both Pfizer and Moderna scientists worked hard to make sure there was a diverse group of people in the vaccine trials. Learn more about Pfizer <InlineLink href="https://www.pfizer.com/news/press-release/press-release-detail/pfizer-and-biontech-conclude-phase-3-study-covid-19-vaccine">here</InlineLink> and Moderna <InlineLink href="https://investors.modernatx.com/news-releases/news-release-details/moderna-announces-primary-efficacy-analysis-phase-3-cove-study)">here</InlineLink>.
              </SectionContent>
              <br></br>
              <SectionSubTitle>
                  <b>Will the COVID vaccine have any effect on the medications I am taking?</b>
              </SectionSubTitle>
              <SectionContent>
              There are no known interactions between any medications and the COVID-19 vaccine (shot). If you have specific concerns, talk to your healthcare provider.
              </SectionContent>
              <br></br>
              <SectionSubTitle>
                  <b>How long after I get the vaccine is it effective?</b>
              </SectionSubTitle>
              <SectionContent>
              CDC guidance says it typically takes a few weeks for the body to build immunity after vaccination.We are still learning about the length of time both natural immunity (immunity the body develops after an illness) and vaccine-induced immunity for COVID-19 will last. It is important to continue to wear your mask over your nose and mouth, practice social distancing, and continue to wash your hands and use hand sanitizer often. You should also wear a mask because although the vaccine (shot) will protect you from getting sick, it will not keep you from spreading COVID-19 to others.
              </SectionContent>
              <br></br>
              <SectionSubTitle>
                  <b>Will the vaccine work against the new strain of coronavirus?</b>
              </SectionSubTitle>
              <SectionContent>
              Scientists are studying this now. There is no evidence that there are changes in vaccine (shot) effectiveness with the new variants, and most experts believe this is unlikely to happen because of science behind how the body attacks the virus. For more information on COVID-19 variants, please visit <InlineLink href="https://www.cdc.gov/coronavirus/2019-ncov/transmission/variant.html">https://www.cdc.gov/coronavirus/2019-ncov/transmission/variant.html</InlineLink>.  
              </SectionContent>
              <br></br>
              <SectionSubTitle>
                  <b>Does the vaccine contain a microchip?</b>
              </SectionSubTitle>
              <SectionContent>
              The vaccine (shot) does not contain a microchip or any other sort of device. It is impossible for a microchip to be placed in a vaccine (shot). It is also impossible that a microchip placed in the body can be tracked or used to control the body in any way.
              </SectionContent>
              <br></br>
              <SectionSubTitle>
                  <b>I don't have insurance. How will I pay for the vaccine?</b>
              </SectionSubTitle>
              <SectionContent>
              The vaccine (shot) is free. Vaccination (shot) providers can charge an administration fee. Vaccination (shot) providers can get this fee paid back by the patient’s public or private insurance company or, for uninsured patients, by the <InlineLink href="https://www.hhs.gov/coronavirus/cares-act-provider-relief-fund/index.html">Health Resources and Services Administration’s Provider Relief Fund</InlineLink>.
              </SectionContent>
          </SectionWrapper>
          <br></br>
          </>
          : <div></div>
          }
        </Layout>
        </>
    )
}

export default VaccinePage;
