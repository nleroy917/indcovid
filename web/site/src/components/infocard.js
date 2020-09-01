/*
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

Info Card for Landing Page Component
*/

import React from "react";
import styled from 'styled-components';

import {
    Paper,
    Grid,
    Typography,
    IconButton,
    Tooltip,
    useMediaQuery,
    Popover
} from '@material-ui/core';


import IndianaIcon from '../images/Info-Thick.svg';

const Wrapper = styled(Paper)`
    padding: 12px;
    height: 100% !important;
    width: ${props => props.mobile ? '100%' : ''};
    background-color: #1d1d1d !important;
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
  font-size: 1.2rem !important;
`

const InfoData = styled(Typography)`
  font-size: 1.4rem !important;
`

const TooltipInfo = styled(Tooltip)`
  padding: 4px !important;
  font-size: 1.5rem !important;
`

const PopoverWrapper = styled(Paper)`
  background-color: #5a5a5a !important;
  color: white !important;
  padding: 4px !important;
  font-size: 1.5rem !important;
`

const DailyData = styled(Typography)`
  font-weight: 300 !important;
  opacity: 0.8;
  font-size: 16px !important;
  text-align: center;
`

const InfoCard = ( { children, color, title, data, moreInfo, daily, units }) => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      if(mobile) {
      setAnchorEl(event.currentTarget);
      }
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const numberWithCommas = (n) =>  {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const open = Boolean(anchorEl);

    return(
        <>
          <Wrapper
            color={color}
            square={true}
            elevation={5}
            mobile={mobile}
          >
          <Grid container 
             direction="row" 
             justify="space-between" 
             alignItems="flex-start"
          >
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
            onClick={handleClick}
          >
            <img
              src={IndianaIcon}
              style={{fill: '#e3e3e3',height: '20px', width: 'auto'}}
            />
          </IconButton>
          </TooltipInfo>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
          <PopoverWrapper>
            {moreInfo}
          </PopoverWrapper>
          </Popover>
          </Grid>
          </Grid>
          <InfoData variant="h4" style={{textAlign: 'center'}}>

            {units ?
              `${numberWithCommas(data)} ${units}`
              :
              numberWithCommas(data)
            }
          </InfoData>
          <DailyData variant="h6">
            {daily ? 
              `+ ${numberWithCommas(daily)}`
              :
              ''
            }
          </DailyData>
            {children}
          </Wrapper>
        </>
    )
}

export default InfoCard;