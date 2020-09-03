import React, { useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import {
    useMediaQuery
} from '@material-ui/core';

import InfoTip from './infotip';

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
            labels: {
                fontColor: 'white'
            }
         },
        height: "100%",
        width: "80%",
        aspectRatio: 1,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{scaleLabel: { display: true, labelString: 'Week', fontColor: 'white', fontSize: '15'}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white', fontSize: '12'}}],
            yAxes: [{scaleLabel: { display: true, labelString: '% Population', fontColor: 'white', fontSize: '15'}, gridLines: { zeroLineColor: "white", display: true, show: false}, ticks:{fontColor: 'white'}}]
        }
    })

    return(
        <>
        <ChartWrapper>
        <InfoTip
          moreInfo="Access to health care is reported in three metrics. 1.) Delayed Health Care, 2.) Did not Get Health Care, or 3.) Delayed or Did Not Get Health Care. Housing units linked to one or more email addresses or cell phone numbers were randomly selected to participate, and one respondent from each housing unit was selected to respond for him or herself. Estimates are weighted to adjust for nonresponse and to match Census Bureau estimates of the population by age, gender, race and ethnicity, and educational attainment."
        />
          <ChartTitle variant="body1" gutterBottom>
            Access to Health Care During COVID-19 Pandemic
          </ChartTitle>
          <Line
            options={options}
            data={{
                labels: weeks,
                datasets: [
                    {
                        label: "Did Not Get Medical Care",
                        borderWidth: 1,
                        borderColor: '#ffa28f',
                        backgroundColor: '#ffa28f',
                        data: didNotGet,
                        pointRadius: 0
                   },
                    {
                        label: "Delayed Medical Care",
                        borderWidth: 1,
                        borderColor: '#78c2ff',
                        backgroundColor: '#78c2ff',
                        data: delayed,
                        pointRadius: 0
                   },
                   {
                        label: "Delayed or Did Not Get Medical Care",
                        borderWidth: 1,
                        borderColor: '#bef794',
                        backgroundColor: '#bef794',
                        data: both,
                        pointRadius: 0
                   },

                ]
            }}
          />
          </ChartWrapper>
        </>
    )
}

export default HealthCareAccess;