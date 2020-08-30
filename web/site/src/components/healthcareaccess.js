import React, { useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import {
    useMediaQuery
} from '@material-ui/core';

const ChartWrapper = styled.div`
    height: 100%;
`

const ChartTitle = styled(Typography)`
    text-align: center;
`;

const HealthCareAccess = ( { weeks, delayed, didNotGet, both } ) => {
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
            fontColor: 'white'
         },
        height: "100%",
        width: "80%",
        aspectRatio: 1,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{scaleLabel: { display: true, labelString: 'Week', fontColor: 'white', fontSize: '15'}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white', fontSize: '12'}}],
            yAxes: [{scaleLabel: { display: true, labelString: 'Count', fontColor: 'white', fontSize: '15'}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white'}}]
        }
    })
    return(
        <>
        <ChartWrapper>
          <ChartTitle variant="body1" gutterBottom>
            Access to Health Care During COVID-19 Pandemic
          </ChartTitle>
          <Line
            options={options}
            data={{
                labels: weeks,
                datasets: [
                    {
                        label: "Delayed Health Care",
                        borderWidth: 1,
                        borderColor: '#78c2ff',
                        data: delayed
                   },
                   {
                        label: "Did Not Get Health Care",
                        borderWidth: 1,
                        borderColor: '#ffa28f',
                        data: didNotGet
                   },
                   {
                        label: "Delayed or Did Not Get",
                        borderWidth: 1,
                        borderColor: '#bef794',
                        data: both
                   },

                ]
            }}
          />
          </ChartWrapper>
        </>
    )
}

export default HealthCareAccess;