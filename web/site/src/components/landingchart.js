import React, {useState} from 'react';
import styled, { withTheme } from 'styled-components';

import { Line } from 'react-chartjs-2';

import {
    Grid,
    Paper,
    useMediaQuery
} from '@material-ui/core';

import SwitchSelector from "react-switch-selector";

const Wrapper = styled(Paper)`
    height: 85% !important;
    padding: ${props => props.mobile ? '5px' : '20px'};
    background-color: #272727 !important;
    &:hover {
        transform: translate(2px,2px);
    }
`

const SelectorWrapper = styled.div`
    height: 25px;
    margin: 10px;
    font-family: inherit;
`

const LandingChart = ({ data, dates }) => {
    const matches = useMediaQuery('(max-width:768px)');
    const [metric, setMetric] = useState('cases')
    const [options, setOptions] = useState({
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
            selectedBackgroundColor: "#005fb8",
        },
        {
            label: "New Deaths",
            value: "deaths",
            selectedBackgroundColor: "#005fb8"
        },
        {
            label: "Recovered",
            value: "recovered",
            selectedBackgroundColor: "#005fb8"
        },
        {
            label: "Hospitalized",
            value: "hospitalized",
            selectedBackgroundColor: "#005fb8"
        },
        {
            label: "New Tests",
            value: "tests",
            selectedBackgroundColor: "#005fb8"
        }
    ];
    const onSelectorChange = (newValue) => {
        setMetric(newValue)
        console.log(data[newValue])
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
               fontSize={matches ? 9 : 10}
               onChange={onSelectorChange}
               options={selectOps}
               backgroundColor={"#272727"}
               fontColor={"#f5f6fa"}
               wrapperBorderRadius={0}
               optionBorderRadius={0}
               selectionIndicatorMargin={2}
               style={{padding: '4px', borderRadius: '0px !important'}}
            />
          </SelectorWrapper>
          <hr
           style={{borderTop: '1px solid'}}
          ></hr>
          <Line
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
                        backgroundColor: "rgba(75,192,192,0.2)",
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