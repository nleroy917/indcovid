import React from 'react';
import styled from 'styled-components';
import {
    Paper
} from '@material-ui/core';

const Wrapper = styled(Paper)`
    height: 80% !important;
    padding: ${props => props.mobile ? '5px' : '20px'};
    background-color: #272727 !important;
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
    height: 100%;
`
{/* <style>
small{position: absolute; z-index: 40; bottom: 0; margin-bottom: -15px;}
</style><div class="embed-container"> */}

const LandingMap = () => {
    return(
        <>
        <Wrapper
        elevation={5}
        square={true}
        >
          <MapWrapper>
            <Map
              width="500" 
              height="400" 
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0" 
              title="Indiana Covid-19 Data" 
              src="//barnabasog.maps.arcgis.com/apps/Embed/index.html?webmap=eae8093967f94adf8f10faf9368145fd&extent=-93.4912,36.1523,-79.3078,43.5376&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=dark">
            >
            </Map>
          </MapWrapper>
        </Wrapper>
        </>
    )
}

export default LandingMap;