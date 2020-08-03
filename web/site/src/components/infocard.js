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

import IndianaIcon from '../images/Info-Thick.svg';

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

const TooltipInfo = styled(Tooltip)`
  padding: 4px !important;
  font-size: 1.5rem !important;
`

const DailyData = styled(Typography)`
  font-weight: 300 !important;
  opacity: 0.8;
`

const InfoCard = ( { children, color, title, data, moreInfo, daily }) => {
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
          <TooltipInfo
            title={moreInfo}
            placement="top"
            arrow={true}
          >
          <IconButton
           style={{margin: 0, padding: '2px'}}
          >
            <img
              src={IndianaIcon}
              style={{fill: '#e3e3e3',height: '20px', width: 'auto'}}
            />
          </IconButton>
          </TooltipInfo>
          </Grid>
          </Grid>
          <InfoData variant="h4" style={{textAlign: 'center'}}>
            {numberWithCommas(data)}
          </InfoData>
          <DailyData variant="h6" style={{textAlign: 'center'}}>
            {`+ ${daily}`}
          </DailyData>
            {children}
          </Wrapper>
        </>
    )
}

export default InfoCard;