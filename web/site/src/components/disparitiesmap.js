import React from 'react';
import styled from 'styled-components';

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.0rem !important;
`

const Map = styled.iframe`
`

const DisparitiesMap = () => {
    return(
        <>
        
        <MapWrapper>
        </MapWrapper>
        </>
    )
}

export default DisparitiesMap;