import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import axios from 'axios';

import test_data from "../utils/test_data"
import * as Utils from "../utils/parse_data"

import LandingChart from './landingchart'

const API_URL = "https://covidtracking.com/api/v1/"

const LandingWrapper = styled.div`
    height: 100vh;
    padding: 50px;
    margin: 10px;
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

const Landing = () => {
    const [data, setData] = useState(null)
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
        <LandingChart data={data}/>
        </LandingWrapper>
    :
        ''
    }
    </div>
    )
}

export default Landing