/*
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

Landing page pie/doughnut chart for ICU capacity
*/

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import { Doughnut } from 'react-chartjs-2';

const Wrapper = styled.div`
    height: 100% !important;
    padding: ${props => props.mobile ? '5px' : '20px'};
    padding-bottom: 10px;
    background-color: #272727 !important;
`

const LandingPie = ({data}) => {

    const [options, setOptions] = useState({
        legend: {
            position: "top",
              labels: {
                  fontColor: "white",
                  fontSize: window.innerWidth < 600 ? 10 : 12,
                  position: "left",
                  padding: window.innerWidth < 600 ? 8 : 10
              }
        } ,
        pieceLabel: {
           render: 'label',
           fontColor: 'black',
           fontSize: 10
        },
        plugins: {
           datalabels: {
              display: true
           }
        },
        aspectRatio: 1,
        maintainAspectRatio: true,
    })
    useEffect(() => {
        console.log(data)
    },[])
    return(
        <>
        <Wrapper>
            <Doughnut
                height={null}
                width={null}
                options={options}
                data={{
                    labels: ['ICU Available', 'ICU In Use - COVID', 'ICU In Use - Else'],
                    datasets: [{
                        data: [data.icu.available, data.icu.covid, data.icu.other],
                        backgroundColor:['rgba(75,192,192,0.9)','white','#5ed950']
                        }]
                }
                }
            />
        </Wrapper>
        </>
    )
}

export default LandingPie;