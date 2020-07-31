import React from "react";
import styled from 'styled-components';

import {
    Paper,
    Typography
} from '@material-ui/core';

const Wrapper = styled(Paper)`
    padding: 12px;
    height: 100%;
    width: 100%;
    background-color: #272727 !important;
    color: inherit !important;
    box-shadow: ${props => props.color} 4px 4px !important;
`

const InfoTitle = styled(Typography)`

`

const InfoData = styled(Typography)`

`

const InfoCard = ( { children, color, title, data }) => {
    return(
        <>
          <Wrapper
            color={color}
            square={true}
            elevation={10}
          >
          <InfoTitle variant="h6"
            gutterBottom
          >
            {title}
          </InfoTitle>
          <InfoData variant="h4" style={{textAlign: 'center'}}>
            {data}
          </InfoData>
            {children}
          </Wrapper>
        </>
    )
}

export default InfoCard;