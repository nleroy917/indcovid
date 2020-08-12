import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const Wrapper = styled.div`
    margin: 5px;
`

const Content = styled(Typography)`
    font-weight: 300 !important;
    font-size: 1.00rem;
    text-align: ${props => props.textAlign ? props.textAlign : ''};
    color: inherit;
`

const SectionContent = ( {children } ) => {
    return(
        <>
        <Wrapper>
          <Content variant="body">
              {children}
          </Content>
        </Wrapper>
        </>
    )
}

export default SectionContent;