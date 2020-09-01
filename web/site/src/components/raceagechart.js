import React, { useState } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import {
    useMediaQuery
} from '@material-ui/core';

import InfoTip from '../components/infotip';

const ChartWrapper = styled.div`
    height: 100%;
    margin: 20px;
`

const ChartTitle = styled(Typography)`
    text-align: center;
`;

const RaceAgeChart = ( { data, labels } ) => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const [options, setOptions] = useState({
        responsive: true,
        tooltips: {
            mode: 'index',
            intersect: false
         },
         hover: {
            mode: 'index',
            intersect: false
         },
        legend: {
            display: true,
            labels: {
                fontColor: 'white'
            }
         },
        height: "100%",
        width: "80%",
        aspectRatio: 1,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{scaleLabel: { display: true, labelString: ''}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white', fontSize: '12'}}],
            yAxes: [{scaleLabel: { display: true, labelString: 'Count', fontColor: 'white', fontSize: '15'}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white'}}]
        }
    })
    return(
        <>
        <ChartWrapper>
        <InfoTip
          moreInfo="Death counts for each reported race are shown on the chart below."
        />
          <ChartTitle variant="body1" gutterBottom>
            Covid-19 Deaths By Age and Race
          </ChartTitle>
          <Bar
           options={options}
           data={{
               labels: labels,
               datasets: [
                   {
                        label: "White",
                        barPercentage: 0.5,
                        barThickness: mobile ? 5 : 12,
                        minBarLength: 5,
                        borderWidth: 1,
                        backgroundColor: '#ffa28f',
                        data: data.White
                   },
                   {
                        label: "Black",
                        barPercentage: 0.5,
                        barThickness: mobile ? 5 : 12,
                        minBarLength: 5,
                        backgroundColor: '#faec93',
                        borderWidth: 1,
                        data: data.Black
                   },
                   {
                        label: "Asian",
                        barPercentage: 0.5,
                        barThickness: mobile ? 5 : 12,
                        minBarLength: 5,
                        backgroundColor: '#bef794',
                        borderWidth: 1,
                        data: data.Asian
                   },
                   {
                        label: "Unknown",
                        barPercentage: 0.5,
                        barThickness: mobile ? 5 : 12,
                        minBarLength: 5,
                        backgroundColor: '#94f7ed',
                        borderWidth: 1,
                        data: data.Unknown
                   }
               ]
           }}
          />
        </ChartWrapper>
        </>
        )
}

export default RaceAgeChart