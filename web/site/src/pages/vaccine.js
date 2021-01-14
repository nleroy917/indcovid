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

const API_URL = process.env.REACT_APP_API_URL

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
            title="More Info" 
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
                  pfizer={vaccineData.pfizer_data}
                  moderna={vaccineData.moderna_data}
                  total={vaccineData.total_data}
                  dates={vaccineData.pfizer_labels}
                />
            </Grid>
          </Grid>
          </>
          : <div></div>
          }
        </Layout>
        </>
    )
}

export default VaccinePage;