import React, { useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import {
    useMediaQuery,
    Paper
} from '@material-ui/core';

import InfoTip from './infotip';

const Wrapper = styled(Paper)`
    padding: ${props => props.mobile ? '15px' : '20px'};
    background-color: #1d1d1d !important;
    color: white;
`

const ChartWrapper = styled.div`
    height: 100%;
`

const ChartTitle = styled(Typography)`
    text-align: center;
    color: white;
`;

const VaccineTimeline = ( { dates, pfizer, moderna, total } ) => {
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
            xAxes: [{
                scaleLabel: { display: true, labelString: 'Date', fontColor: 'white', fontSize: '15'}, 
                gridLines: { zeroLineColor: "white", display: true, show: false}, 
                ticks:{fontColor: 'white', fontSize: '12', maxTicksLimit: 8},
                type: 'time',
                time: {
                  displayFormats: {
                     'millisecond': 'MMM DD',
                     'second': 'MMM DD',
                     'minute': 'MMM DD',
                     'hour': 'MMM DD',
                     'day': 'MMM DD',
                     'week': 'MMM DD',
                     'month': 'MMM DD',
                     'quarter': 'MMM DD',
                     'year': 'MMM DD',
                  }
                }
            }],
            yAxes: [{
                scaleLabel: { display: true, labelString: 'Count', fontColor: 'white', fontSize: '15'}, 
                gridLines: { zeroLineColor: "white", display: true, show: false}, 
                ticks:{fontColor: 'white'}}]
        }
    })

    return(
        <>
        <Wrapper>
        <ChartWrapper>
        <br></br>
        <br></br>
          <ChartTitle variant="h6" gutterBottom>
            Vaccine Allocation Timeline
            <InfoTip
          moreInfo="This dataset lists the allocations of doses that will be made available for states and jurisdictions to order against. Weekly first-dose allocations are provided to states on Tuesdays; jurisdictions can begin placing orders on Thursdays. After doses are ordered by states, shipments begin the following Monday."
        />
          </ChartTitle>
          <Line
            options={options}
            data={{
                labels: dates,
                datasets: [
                    {
                        label: "Pfizer",
                        borderWidth: 2,
                        borderColor: '#ffa28f',
                        data: pfizer,
                        pointRadius: 1
                   },
                    {
                        label: "Moderna",
                        borderWidth: 2,
                        borderColor: '#78c2ff',
                        data: moderna,
                        pointRadius: 1
                   },
                   {
                        label: "Total",
                        borderWidth: 2,
                        borderColor: '#bef794',
                        data: total,
                        pointRadius: 1
                   },

                ]
            }}
          />
          </ChartWrapper>
          </Wrapper>
        </>
    )
}

export default VaccineTimeline;