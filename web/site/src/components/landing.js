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

import { Link } from 'gatsby';

import Nav from '../components/nav';
import InfoCard from '../components/infocard';
import LandingChart from '../components/landingchart';
import LandingPie from '../components/landingpie';
import LandingMap from '../components/landingmap';

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

const Wrapper = styled.div`
    height: ${props => props.mobile ? '' : '95vh'};
    @media (max-width: 768px) {
      height: none;
  }

`

const LearnMoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5px;
`

const SquareButton = styled(Button)`
  border-radius: 0px !important;
  margin: 5px !important;
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const RoundedButton = styled.a`
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    text-decoration: none;
    margin: 5px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background: #3b9090;
    border: none;
    color: white;
    border: white solid 1px;
    font-family: Roboto;
    font-size: 1.00rem;
    transition: ease-in 0.15s;
    border-radius: 30px;
    
    &:hover {

        background: white;
        color: #3b9090;
        border: #3b9090 solid 1px;
        cursor: pointer;
        border: #3b9090 solid 1px;
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

const Landing = ({dates, covidNow, covidHistoric, smoothScroll, equityRef}) => {

    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    const iPadPro = useMediaQuery('(max-device-width:1024px)', { noSsr: true });
    
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
          {mobile ? '' : <Nav smoothScroll={smoothScroll}/>}
          {
          /* 
            LANDING CHART AND MAP | SET TO BE 60% OF THE VIEW HEIGHT
          */
          }
          <br></br>
          <Grid container
            direction="row"
            alignItems={mobile? "flex-start" : "stretch"}
            justify={mobile || iPad ? "center" : "center"}
            spacing={mobile ? 2 : 4}
            style={{height: mobile ? '' : iPad ? '' : iPadPro ? '45vh' : '55vh', paddingBottom: mobile || iPad ? '10px' : 0}}
            >
          <Grid item lg={6} md={6} s={5} xs={!mobile ? 6 : 12}>
            <LandingChart
              dates={dates}
              data={covidHistoric}
            />
          </Grid>
          <Grid item lg={6} md={6} s={5} xs={!mobile ? 6 : 12}>
            <LandingMap />
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
          {
            mobile ? 
            ''
            :
          <ButtonWrapper>
            <RoundedButton
              onClick={smoothScroll}
            >
              Learn More
            </RoundedButton>
          </ButtonWrapper>
          }
        </Wrapper>
        </>
    )
}

export default Landing;