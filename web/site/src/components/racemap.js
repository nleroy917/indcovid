/*
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

Landing page map of Indiana - Contains Arc-Gis map
*/

import React from 'react';
import styled from 'styled-components';
import {
    Paper,
    useMediaQuery
} from '@material-ui/core';

const Wrapper = styled(Paper)`
    height: 100% !important;
    padding: ${props => props.mobile || props.iPad ? '15px' : '20px'};
    background-color: #1d1d1d !important;
`

const MapWrapper = styled.div`
    position: relative; 
    padding-bottom: 100%; 
    height: 0; 
    max-width: 100%;
`

const Map = styled.iframe`
    position: absolute !important; 
    top: 0; 
    left: 0;
    width: 100%; 
    height: 100%;
    position: absolute !important; 
    z-index: 40; 
    bottom: 0; 
    margin-bottom: -15px;
`

const RaceMap = () => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    return(
        <>
        <Wrapper
          elevation={5}
          square={true}
          mobile={mobile}
          iPad={iPad}
        >
          <MapWrapper>
            <Map
              mobile={mobile}
              iPad={iPad}
              width="450" 
              height="450" 
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0" 
              title="Race Map IndCovid" 
              src="//barnabasog.maps.arcgis.com/apps/Embed/index.html?webmap=1cdd3b6e79fe4e6b8f19c3b94e9705d3&extent=-89.3546,37.7671,-82.2629,41.4763&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&legend=true&disable_scroll=true&theme=dark"
            >
            </Map>
          </MapWrapper>
        </Wrapper>
        </>
    )
}

export default RaceMap;