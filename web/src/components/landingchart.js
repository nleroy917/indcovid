import React from 'react'
import styled from 'styled-components'
import {
    isMobile
} from 'react-device-detect'

import { Line } from 'react-chartjs-2';
import { rgbToHex } from '@material-ui/core';

const ChartWrapper = styled.div`
    
    padding:50px;
    align-items: center;
    @media (max-width: 768px) {
        padding:10px;
        margin:0;
    }
`

const LandingChart = ({data, log, smooth, grids}) => {
    
    const style = smooth ? 0 : 3
    const gridColor = grids ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)'
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
                                    gridLines: {zeroLineColor: '#FFF', color: gridColor},
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
                                    type: log ? 'logarithmic' : 'linear'
                                }],
                                xAxes: [{
                                    gridLines: {zeroLineColor: '#FFF', color: gridColor},
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
                        datasets:[{label: 'Cases', data: data.cases.data, backgroundColor: 'rgba(81, 197, 255, 0.61)', borderColor: 'rgba(81, 197, 255, 1)',borderWidth: style, pointRadius: style},
                            {label: 'Deaths', data: data.deaths.data, backgroundColor: 'rgba(255, 226, 81, 0.61)', borderColor: 'rgba(255, 226, 81, 0.61)',borderWidth: style, pointRadius: style},
                            {label: 'Hospitalizations', data: data.hosp.data, backgroundColor: 'rgba(244, 26, 95, 0.61)', borderColor: 'rgba(244, 26, 95, 1)',borderWidth: style, pointRadius: style}]
                        }}
            />
        </ChartWrapper>
    </>)
}

export default LandingChart