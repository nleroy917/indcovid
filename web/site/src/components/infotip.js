import React from "react";
import styled from 'styled-components';

import {
    Paper,
    IconButton,
    Tooltip,
    useMediaQuery,
    Popover
} from '@material-ui/core';

import IndianaIcon from '../images/Info-Thick.svg';

const TooltipInfo = styled(Tooltip)`
  padding: 4px !important;
  font-size: 1.5rem !important;
`

const PopoverWrapper = styled(Paper)`
  background-color: #4a4949 !important;
  color: white !important;
  padding: 4px !important;
  font-size: 1.5rem !important;
`

const MoreInfo = styled.p`
  font-size: 0.8rem;
  margin: 2px;
`



const InfoTip = ( { moreInfo } ) => {

    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        if(mobile) {
        setAnchorEl(event.currentTarget);
        }
      };
  
      const handleClose = () => {
        setAnchorEl(null);
      };

    const open = Boolean(anchorEl);

    return(
        <>
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
              alt="Outline of Indiana"
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
                <MoreInfo>
                  {moreInfo}
                </MoreInfo>
            </PopoverWrapper>
            </Popover>
        </>
    )
}

export default InfoTip;