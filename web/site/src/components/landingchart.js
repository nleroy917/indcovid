/*
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

Landing Page Graph/Chart on Pandemic Statistics
*/

import React, {useState} from 'react';
import styled from 'styled-components';

import { Bar } from 'react-chartjs-2';

import {
    Grid,
    Paper,
    useMediaQuery
} from '@material-ui/core';

import SwitchSelector from "react-switch-selector";

const Wrapper = styled(Paper)`
    height: 85% !important;
    padding: ${props => props.mobile ? '15px' : '20px'};
    background-color: #1d1d1d !important;
`

const SelectorWrapper = styled.div`
    height: 25px;
    margin: 10px;
    font-family: inherit;
    text-align: center;
`

const LandingChart = ({ data, dates }) => {
    const matches = useMediaQuery('(max-width:768px)');
    const [metric, setMetric] = useState('cases')
    const [options, setOptions] = useState({
        tooltips: {
            mode: 'index',
            intersect: false
         },
         hover: {
            mode: 'index',
            intersect: false
         },
        legend: {
            display: false
         },
        aspectRatio: 1,
        maintainAspectRatio: true,
        scales: {
            xAxes: [{scaleLabel: { display: true, labelString: ''}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white', maxTicksLimit: 8}}],
            yAxes: [{scaleLabel: { display: false, labelString: ``, fontColor: 'white', fontSize: '18'}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white'}}]
        }
    })
    const selectOps = [
        {
            label: "New Cases",
            value: "cases",
            selectedBackgroundColor: "rgba(75,192,192,0.9)",
        },
        {
            label: "New Deaths",
            value: "deaths",
            selectedBackgroundColor: "rgba(75,192,192,0.9)"
        },
        {
            label: "Newly Recovered",
            value: "recovered",
            selectedBackgroundColor: "rgba(75,192,192,0.9)"
        },
        {
            label: "Daily Hospitalized",
            value: "hospitalized",
            selectedBackgroundColor: "rgba(75,192,192,0.9)"
        },
        {
            label: "New Tests",
            value: "tests",
            selectedBackgroundColor: "rgba(75,192,192,0.9)"
        }
    ];
    const onSelectorChange = (newValue) => {
        setMetric(newValue)
    };
    return(
        
        <>
        <Wrapper
          square={true}
          elevation={5}
          mobile={matches}
        >
          <SelectorWrapper>
            <SwitchSelector
               border={4}
               fontSize={matches ? 9 : 12}
               onChange={onSelectorChange}
               options={selectOps}
               backgroundColor={"#1d1d1d"}
               fontColor={"#f5f6fa"}
               wrapperBorderRadius={0}
               optionBorderRadius={0}
               selectionIndicatorMargin={-2}
               style={{padding: '4px', borderRadius: '0px !important'}}
            />
          </SelectorWrapper>
          <hr
           style={{borderTop: '1px solid'}}
          ></hr>
          <Bar
            height={null}
            width={null}
            options={options}
            data={{
                labels: dates,
                datasets: [
                    {
                        label: metric,
                        data: data[metric],
                        fill: true,
                        borderWidth: 0,
                        backgroundColor: "rgba(75,192,192,0.9)",
                        borderColor: "rgba(75,192,192,1)",
                        pointRadius: 0,
                        lineTension: 0
                    }
                ]
            }}
            options={options}
          />
        </Wrapper>
        </>
    )
}

export default LandingChart;