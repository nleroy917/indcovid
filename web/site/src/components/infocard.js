import React from "react";
import styled from 'styled-components';

import {
    Paper,
    Grid,
    Typography,
    IconButton,
    Tooltip
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const Wrapper = styled(Paper)`
    padding: 12px;
    height: 100% !important;
    width: 100%;
    background-color: #272727 !important;
    color: inherit !important;
    /* box-shadow: ${props => props.color} 8px 8px !important; */
    transition: ease 0.2s;
    &:hover {
      transform: translate(1px,1px);
      /* box-shadow: ${props => props.color} 4px 4px !important; */
    }
`

const InfoTitle = styled(Typography)`
  font-weight: 300 !important;
`

const InfoData = styled(Typography)`

`

const InfoCard = ( { children, color, title, data, moreInfo }) => {
  const numberWithCommas = (n) =>  {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
    return(
        <>
          <Wrapper
            color={color}
            square={true}
            elevation={5}
          >
          <Grid container diretion="row" justify="space-between" alignItems="flex-start">
          <Grid item>
          <InfoTitle variant="h6"
            gutterBottom
          >
            {title}
          </InfoTitle>
          </Grid>
          <Grid item>
          <Tooltip
            title={moreInfo}
            placement="top"
          >
          <IconButton
           style={{margin: 0, padding: '2px'}}
          >
            <InfoOutlinedIcon 
              style={{fill: '#e3e3e3'}}
            />
          </IconButton>
          </Tooltip>
          </Grid>
          </Grid>
          <InfoData variant="h4" style={{textAlign: 'center'}}>
            {numberWithCommas(data)}
          </InfoData>
            {children}
          </Wrapper>
        </>
    )
}

export default InfoCard;