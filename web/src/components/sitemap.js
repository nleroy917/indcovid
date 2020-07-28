import React from 'react';
import styled from 'styled-components'

const MapWrapper = styled.div`
    height: 100vh;
`

const EmbedContainer = styled.div`
    position: relative; 
    padding-bottom: 80%; 
    height: 0; 
    max-width: 100%;
`

const Map = styled.iframe`
    position: absolute;
    top: 0; 
    left: 0; 
    width: 100%;
    height: 100%
`

const SiteMap = () => {
    return(
    <>
    <MapWrapper>
    <EmbedContainer>
     <Map  width="500" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="Indiana Covid-19 Data" src="//barnabasog.maps.arcgis.com/apps/Embed/index.html?webmap=eae8093967f94adf8f10faf9368145fd&extent=-88.4211,38.6747,-82.851,41.3396&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light">
     </Map>
     </EmbedContainer>
    </MapWrapper>
    </>)
}

export default SiteMap