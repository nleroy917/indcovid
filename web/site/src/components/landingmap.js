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
    height: 85% !important;
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
    border: none;
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%;
    height: ${props => props.mobile ? '100%' : '104%'};
    position: absolute; 
    z-index: 40; 
    bottom: 0; 
`

const LandingMap = () => {
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
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0" 
              title="Indiana Covid-19 Data" 
              src="//barnabasog.maps.arcgis.com/apps/Embed/index.html?webmap=eae8093967f94adf8f10faf9368145fd&extent=-88.087,38.8115,-84.5412,40.6636&home=true&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=dark"
            >
            </Map>
          </MapWrapper>
        </Wrapper>
        </>
    )
}

export default LandingMap;