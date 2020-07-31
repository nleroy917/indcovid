import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import {
    isMobile
} from 'react-device-detect';
import axios from 'axios';

import {
    Typography,
    Grid
} from '@material-ui/core';

import InfoCard from '../components/infocard'

const COVID_19_API_NOW = 'https://covidtracking.com/api/v1/states/in/current.json'
const COVID_19_API_HISTORIC = 'https://covidtracking.com/api/v1/states/in/daily.json'

const Wrapper = styled.div`
    height: 70vh; 
`

const LandingTitle = styled(Typography)`
    font-weight: 400 !important;
    font-size: 2rem !important;

`

const Landing = () => {

    const [covidNow, setCovidNow] = useState([])
    const [covidHistoric, setCovidHistoric] = useState([])

    const fetchCovid = async () => {
        
        let res1 = await axios.get(COVID_19_API_NOW)
        let res2 = await axios.get(COVID_19_API_HISTORIC)
        if(res1.status === 200) {
            let data = await res1.data
            setCovidNow(data)
        }
        if(res2 === 200) {
            let data = await res2.data
            setCovidHistoric(data)
        }
    }

    useEffect(() => {
        fetchCovid()
    }, [])

    return(
        <>
        <Wrapper>
          <LandingTitle variant="h2"
            gutterBottom
          >
            The Widespread Implications of the COVID-19 Pandemic in Indiana.
          </LandingTitle>
          <Grid container
            direction="row"
            alignItems="center"
            justify="space-between"
            spacing={3}
            style={{width: '100%', height: '33%', textAlign: isMobile ? 'center' : ''}}
          >
          <Grid item lg={3} xs={10}>
          <InfoCard
            color="red"
            title="No. of Cases:"
            data={covidNow.positive}
          > 
          </InfoCard>
          </Grid>
          <Grid item lg={3} xs={10}>
          <InfoCard
            color="yellow"
            title="No. Tested:"
            data={covidNow.total}
          >
          </InfoCard>
          </Grid>
          <Grid item lg={3} xs={10}
          >
            <InfoCard 
              color="green"
              title="No. Recovered:"
              data={covidNow.recovered}
            >  
             </InfoCard>
          </Grid>
          </Grid>
        </Wrapper>
        </>
    )

}

export default Landing;