import React, { useState } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Typography, Paper } from '@material-ui/core';
import InfoTip from './infotip';

const ChartWrapper = styled.div`
    height: 100%;
    width: 100%;
`

const Wrapper = styled(Paper)`
    padding: ${props => props.mobile ? '15px' : '20px'};
    background-color: #1d1d1d !important;
    color: white;
`

const ChartTitle = styled(Typography)`
    text-align: center;
    color: white;
`;

const VaccineTotals = ( { first_dose_data, second_dose_data, labels } ) => {
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
        aspectRatio: 1,
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                scaleLabel: { display: true, labelString: 'Supplier', fontColor: 'white', fontSize: '15'}, 
                gridLines: { zeroLineColor: "white", display: true, show: false}, 
                ticks:{fontColor: 'white', fontSize: '12', maxTicksLimit: 8}
            }],
            yAxes: [{
                scaleLabel: { display: true, labelString: 'Count', fontColor: 'white', fontSize: '15'}, 
                gridLines: { zeroLineColor: "white", display: true, show: false}, 
                ticks:{fontColor: 'white', min: 0}
            }]
        }
    })
    return(
        <>
        <Wrapper>
        <ChartWrapper>
          <ChartTitle variant="h6" gutterBottom>
             Total Vaccine Allocation 
            <InfoTip moreInfo="This dataset lists the allocations of doses that will be made available for states and jurisdictions to order against. Weekly first-dose allocations are provided to states on Tuesdays; jurisdictions can begin placing orders on Thursdays. After doses are ordered by states, shipments begin the following Monday." />
          </ChartTitle>
          <Bar
            height={null}
            width={null}
            options={options}
            data={{
                labels: labels,
                datasets: [
                    {
                        label: "First Dose",
                        barPercentage: 0.5,
                        barThickness: 25,
                        minBarLength: 5,
                        backgroundColor: '#78c2ff',
                        borderWidth: 1,
                        data: first_dose_data
                    },
                    {
                        label: "Second Dose",
                        barPercentage: 0.5,
                        barThickness: 25,
                        minBarLength: 5,
                        backgroundColor: '#ff8578',
                        borderWidth: 1,
                        data: second_dose_data
                    }
                ]
            }}
          />
        </ChartWrapper>
        </Wrapper>
        </>
    )
}

export default VaccineTotals;