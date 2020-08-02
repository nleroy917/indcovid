import React, {useEffect} from 'react';
import styled from 'styled-components';

import { Pie } from 'react-chartjs-2';

const Wrapper = styled.div`

`

const LandingPie = ({data}) => {
    useEffect(() => {
        console.log(data)
    },[])
    return(
        <>
          <Wrapper>
            <Pie
                data={{
                    labels: ['ICU Available', 'ICU In Use - COVID', 'ICU In Use - Else'],
                    data: [data.icu.available, data.icu.covid, data.icu.other]
                }
                }
            />
          </Wrapper>
        </>
    )
}

export default LandingPie;