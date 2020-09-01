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

const MentalHealthGraph = ( { weeks, anxiety, depression, both } ) => {
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
            moreInfo="Three metrics were reported. 1.) Anxiety, 2.) Depression, 3.) Anxiety and Depression. Housing units linked to one or more email addresses or cell phone numbers were randomly selected to participate, and one respondent from each housing unit was selected to respond for him or herself. Estimates are weighted to adjust for nonresponse and to match Census Bureau estimates of the population by age, gender, race and ethnicity, and educational attainment."
        />
          <ChartTitle variant="body1" gutterBottom>
            Mental Health in Indiana
          </ChartTitle>
          <Line
            options={options}
            data={{
                labels: weeks,
                datasets: [
                    {
                        label: "Depression",
                        borderWidth: 1,
                        borderColor: '#df3dff',
                        backgroundColor: '#df3dff',
                        data: depression,
                        pointRadius: 0
                   },
                   {
                        label: "Anxiety",
                        borderWidth: 1,
                        borderColor: '#03fcf0',
                        backgroundColor: '#03fcf0',
                        data: anxiety,
                        pointRadius: 0
                   },
                    {
                        label: "Both",
                        borderWidth: 1,
                        borderColor: '#ff6f3b',
                        backgroundColor: '#ff6f3b',
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

export default MentalHealthGraph;