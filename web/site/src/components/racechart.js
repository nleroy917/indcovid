import React, { useState } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

const ChartWrapper = styled.div`
    height: 100%;
`

const ChartTitle = styled(Typography)`
    text-align: center;
`;

const RaceChart = ( { data, labels } ) => {
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
        aspectRatio: 2,
        maintainAspectRatio: true,
        scales: {
            xAxes: [{scaleLabel: { display: true, labelString: ''}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white', fontSize: '12', maxTicksLimit: 8}}],
            yAxes: [{scaleLabel: { display: true, labelString: '% Population', fontColor: 'white', fontSize: '15'}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white'}}]
        }
    })
    return(
        <>
        <ChartWrapper>
          <ChartTitle variant="body1" gutterBottom>
            Indiana Race Demographics
          </ChartTitle>
          <Bar
            options={options}
            data={{
                labels: labels,
                datasets: [
                    {
                        label: "Indiana Demographics",
                        barPercentage: 0.5,
                        barThickness: 30,
                        minBarLength: 5,
                        backgroundColor: ['rgba(255,129,150,0.8)','rgba(255,177,9,0.8)','rgba(255,201,82,0.8)','rgba(94,236,230,0.8)','rgba(114,190,253,0.8)','rgba(174,137,255,0.8)','rgba(255,249,245,0.8)'],
                        borderColor: ['rgba(255,129,150,1)','rgba(255,177,9,1)','rgba(255,201,82,1)','rgba(94,236,230,1)','rgba(114,190,253,1)','rgba(174,137,255,1)','rgba(255,249,245,1)'],
                        borderWidth: 1,
                        data: data
                    }
                ]
            }}
          />
        </ChartWrapper>
        </>
    )
}

export default RaceChart;