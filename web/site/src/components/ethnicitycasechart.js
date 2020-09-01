import React, { useState } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import InfoTip from './infotip';

const ChartWrapper = styled.div`
    height: 100%;
`

const ChartTitle = styled(Typography)`
    text-align: center;
`;

const CovidEthnicityChart = ( { indiana_data, covid_data, labels } ) => {
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
            display: true,
            labels: {
                fontColor: 'white'
            }
         },
        height: "100%",
        width: "100%",
        aspectRatio: 1,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{scaleLabel: { display: true, labelString: ''}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white', fontSize: '12', maxTicksLimit: 8}}],
            yAxes: [{scaleLabel: { display: true, labelString: '% Population', fontColor: 'white', fontSize: '15'}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white'}}]
        }
    })
    return(
        <>
        <ChartWrapper>
        <InfoTip moreInfo="Due to the nature of the COVID-19 testing, only select ethnicity data is acquired. Sometimes it is not taken at all. Thus, the Indiana Census data was consolidated to fit this." />
          <ChartTitle variant="body1" gutterBottom>
            COVID-19 Case Demographics (Ethnicity)
          </ChartTitle>
          <Bar
            options={options}
            data={{
                labels: labels,
                datasets: [
                    {
                        label: "Indiana Demographics",
                        barPercentage: 0.5,
                        barThickness: 25,
                        minBarLength: 5,
                        backgroundColor: '#78c2ff',
                        borderWidth: 1,
                        data: indiana_data
                    },
                    {
                        label: "COVID-19 Case Demographics",
                        barPercentage: 0.5,
                        barThickness: 25,
                        minBarLength: 5,
                        backgroundColor: '#97ff85',
                        borderWidth: 1,
                        data: covid_data
                    }
                ]
            }}
          />
        </ChartWrapper>
        </>
    )
}

export default CovidEthnicityChart;