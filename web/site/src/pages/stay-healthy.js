import React from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Placeholder } from "../components/placeholder-div";

import {
  Button,
  Grid,
  useMediaQuery,
  Typography
} from '@material-ui/core';

import Nav from '../components/nav';
import ReopeningTimeline from '../components/reopeningtimeline';

import wash_hands from '../images/hand-wash.png';
import covid_test from '../images/covid-test.png'

const SquareButton = styled(Button)`
  border-radius: 0px !important;
  margin: 5px !important;
`

const SectionTitle = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
`

const SectionContent = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
    font-weight: 300 !important;
`

const ALink = styled(Link)`
  color: inherit;
  font-size: 0.75rem;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const Img = styled.img`
    height: 150px;
    width: auto;
    overflow: cover;
    margin: 20px;
`

const List = styled.ul`
    font-weight: 300;
`

const ListItem = styled.li`

`

const StayHealthyPage = () => {

    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    const iPadPro = useMediaQuery('(max-device-width:1024px)', { noSsr: true });
    console.log('Mobile:', mobile)
    return(
    <Layout>
      <SEO title="Stay Healthy" />
      <Nav />
      <br></br>
      <Grid container
        direction="row"
        justify={mobile ? "center" : "flex-start"}
        alignItems="stretch"
        style={{width: '100%', margin: '10px'}}
        >
        <Grid item lg={6} md={6} xs={12}>
            <SectionTitle 
              gutterBottom 
              variant="h4"
            >
                Wash Your Hands
            </SectionTitle>
            <SectionContent>
                The CDC states that keeping your hands clean is especially important to help prevent the spread of the virus. Wash your hands often with soap and water for at least 20 seconds especially after you have been in a public place, or after blowing your nose, coughing, or sneezing. Its especially important to wash:
            </SectionContent>
            <List>
              <ListItem>Before eating or preparing food</ListItem>
              <ListItem>Before touching your face</ListItem>
              <ListItem>After using the restroom</ListItem>
              <ListItem>After leaving a public place</ListItem>
              <ListItem>After blowing your nose, coughing, or sneezing</ListItem>
              <ListItem>After handling your mask</ListItem>
              <ListItem>After changing a diaper</ListItem>
              <ListItem>After caring for someone sick</ListItem>
              <ListItem>After touching animals or pets</ListItem>
            </List>
        </Grid>
        <Grid item lg={6} md={6} xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Img src={wash_hands} />
        </Grid>
        <Grid container
        direction="row"
        justify={mobile ? "center" : "flex-start"}
        alignItems="stretch"
        style={{width: '100%', margin: '10px'}}
        >
        <Grid item lg={6} md={6} xs={12} style={{display: mobile ? '' : 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {
            mobile ? 
            <>
            <SectionTitle 
              gutterBottom 
              variant="h4"
            >
                Get tested
            </SectionTitle>
            <SectionContent gutterBottom>
            If you think you have been exposed to COVID-19 and develop a fever and symptoms, such as cough or difficulty breathing, call your healthcare provider for medical advice. If you have a medical appointment, call your doctor’s office or emergency department, and tell them you have or may have COVID-19. This will help the office protect themselves and other patients. You can also consult a healthcare provider through telehealth, if that is an option.
            </SectionContent>
            <SquareButton 
              variant="outlined" 
              color="inherit"
              href="https://www.hhs.gov/coronavirus/community-based-testing-sites/index.html"
            >
                Get Tested
            </SquareButton> 
            </>
            : 
            <Img src={covid_test} /> 
        } 
        </Grid>
        <Grid item lg={6} md={6} xs={12} style={{display: mobile ? 'contents' : ''}}>
        {
            mobile ?
            <Img src={covid_test} />  
            : 
            <>
            <SectionTitle 
              gutterBottom 
              variant="h4"
            >
                Get tested
            </SectionTitle>
            <SquareButton 
              variant="outlined" 
              color="inherit"
              href="https://lhi.care/covidtesting"
            >
                Get Tested
            </SquareButton>
            <SectionContent gutterBottom>
            If you think you have been exposed to COVID-19 and develop a fever and symptoms, such as cough or difficulty breathing, call your healthcare provider for medical advice. If you have a medical appointment, call your doctor’s office or emergency department, and tell them you have or may have COVID-19. This will help the office protect themselves and other patients. You can also consult a healthcare provider through telehealth, if that is an option.
            </SectionContent>
            </>
        }
        </Grid>
        </Grid>
        </Grid>
        <SectionTitle gutterBottom variant="h4">
          Indiana's "Back-on-Track" Plan
        </SectionTitle>
        <SectionContent gutterBottom>
          The state of Indiana has committed to a 4-Stage plan to get Indiana "back on track". Included in this plan are systems in place to slowly and safely open our small businesses, gyms, restaurants, entertainment venues, and social gatherings to get our economy going again while keeping Hoosier's safe. It is important that we follow the guidelines and mandates set in place to get using moving to the next stage as quikcly as possible.
        </SectionContent>
        <ReopeningTimeline />
    </Layout>
    )
  }
  
  export default StayHealthyPage;
  