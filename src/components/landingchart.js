import React from 'react'
import styled from 'styled-components'
import {
    isMobile
} from 'react-device-detect'

import { Line } from 'react-chartjs-2';

const ChartWrapper = styled.div`
    height:100%;
    padding:50px;
    align-items: center;
    @media (max-width: 768px) {
        padding:10px;
        margin:0;
    }
`

const LandingChart = ({data}) => {
    return(
    <>
    <ChartWrapper>
            <Line
                width={80}
                height={isMobile ? 100 : 50}
                options={{
                    legend: {
                            labels: {
                                fontColor: "white"
                                    },
                    },
                    scales: {
                                yAxes: [{
                                    gridLines: {zeroLineColor: '#FFF'},
                                    scaleLabel: {
                                            display: true,
                                            labelString: 'Count',
                                            fontColor:'#FFF',
                                            fontSize:16
                                                },
                                    ticks: {
                                            callback(tick, index, ticks) {
                                                
                                                return tick.toLocaleString()
                                            },
                                            fontColor: "white",
                                            fontSize: 12,
                                            maxTicksLimit: 10,
                                            autoSkip: true,
                                            },
                                    type: 'logarithmic'
                                }],
                                xAxes: [{
                                    gridLines: {zeroLineColor: '#FFF'},
                                    scaleLabel: {
                                            display: true,
                                            labelString: 'Date',
                                            fontColor:'#FFF',
                                            fontSize:16
                                                },
                                    ticks: {
                                        
                                        maxTicksLimit: isMobile ? 10 : 20,
                                        autoSkip: true,
                                        fontColor: "white",
                                        fontSize: isMobile ? 10 : 12
                                    }

                                }],
                                legend: { labels: {fontColor: "white"}}}
                        }}
                        
                data={{ labels: data.labels,
                        datasets:[{label: 'Cases', data: data.cases.data, backgroundColor: 'rgba(81, 197, 255, 0.61)', borderColor: 'rgba(81, 197, 255, 1)'},
                            {label: 'Deaths', data: data.deaths.data, backgroundColor: 'rgba(255, 226, 81, 0.61)', borderColor: 'rgba(255, 226, 81, 0.61)'},
                            {label: 'Hospitalizations', data: data.hosp.data, backgroundColor: 'rgba(244, 26, 95, 0.61)', borderColor: 'rgba(244, 26, 95, 1)'}]
                        }}
            />
        </ChartWrapper>
    </>)
}

export default LandingChart