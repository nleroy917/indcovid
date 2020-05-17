import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import axios from 'axios';

import test_data from "../utils/test_data"
import * as Utils from "../utils/parse_data"

import {
    Grid
} from '@material-ui/core'
import Switch from "react-switch";

import Loader from './loader'
import LandingChart from './landingchart'

const API_URL = "https://covidtracking.com/api/v1/"

const LandingWrapper = styled.div`
    height: 100vh;
    padding: 50px;
    margin: 10px;
    @media (max-width: 768px) {
    padding:10px;
    margin:2px;
  }
`

const TitleWrapper = styled.div`
    width: 100%;
    border-bottom: white 1px solid;
`

const Title = styled.h1`
    font-weight: 300;
    font-size: 3rem;
    margin-bottom: 0;
`

const SubTitle = styled.h2`
    font-weight: 200;
    font-size: 1.5rem;
`

const SwitchWrapper = styled.div`
    text-align: left;
    padding: 5px;
`

const SwitchLabel = styled.p`
    padding: 2px;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 5px;
`

const SwitchText = styled.span`
    padding: 5px;
`
const Label = styled.label`
    display: flex;
`

const Landing = () => {
    const [data, setData] = useState(null)
    const [logSwitch, setLogSwitch] = useState(true)
    const [styleSwitch, setStyleSwitch] = useState(true)
    const [gridLineSwitch, setGridLineSwitch] = useState(false)

    const handleLogSwitch = () => {
        setLogSwitch(!logSwitch)
    }
    const handleStyleSwitch = () => {
        setStyleSwitch(!styleSwitch)
    }
    const handleGridLineSwitch = () => {
        setGridLineSwitch(!gridLineSwitch)
    }

    const fetchData = async () => {
        const endpoint = API_URL + 'states/daily.json'
        const res = await axios.get(endpoint)
        if (res.status === 200) {
            const data = await res.data
            const parsed = Utils.parse_data(data)
            console.log(parsed)
            setData(parsed)
        }
        
    }

    useEffect(() => {
        fetchData()
    },[])

    return(
    
    <div>
    {data ? 
        <LandingWrapper>
          <TitleWrapper>
            <Title>
              COVID-19 in Indiana
            </Title>
            <SubTitle>
              How are SARS-CoV-2 cases disproportionately affecting people?
            </SubTitle>
          </TitleWrapper>
             <LandingChart log={logSwitch} smooth={styleSwitch} grids={gridLineSwitch} data={data}/>
             <Grid container direction="row" justify="space-between" alignItems="center" style={{width: '100%'}}>
                <Grid item>
                <SwitchWrapper>
                    <SwitchLabel>Scale Type</SwitchLabel>
                  <Label>
                   <SwitchText> Linear </SwitchText>
                     <Switch onChange={handleLogSwitch} checked={logSwitch} onColor='#0079c1'/>
                   <SwitchText> Log </SwitchText>
                  </Label>
               </SwitchWrapper>
               </Grid>
               <Grid item>
               <SwitchWrapper>
                    <SwitchLabel>Style</SwitchLabel>
                  <Label>
                   <SwitchText> Normal </SwitchText>
                     <Switch onChange={handleStyleSwitch} checked={styleSwitch} onColor='#0079c1'/>
                   <SwitchText> Smooth </SwitchText>
                  </Label>
               </SwitchWrapper>
               </Grid>
               <Grid item>
               <SwitchWrapper>
                    <SwitchLabel>Grid Lines</SwitchLabel>
                  <Label>
                   <SwitchText> Off </SwitchText>
                     <Switch onChange={handleGridLineSwitch} checked={gridLineSwitch} onColor='#0079c1'/>
                   <SwitchText> On </SwitchText>
                  </Label>
               </SwitchWrapper>
               </Grid>
             </Grid>
        </LandingWrapper>
    :   
    <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{minHeight:'100vh'}}
      >
       <Grid item>
        <Loader
          size={200}
        />
       </Grid>
      </Grid>
    }
    </div>
    )
}

export default Landing