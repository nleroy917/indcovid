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
            <Map
              src="https://datavizpublic.in.gov/views/COVID-19CaseCountsbyZip/COVID-19CaseCountsbyZipCode?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:isGuestRedirectFromVizportal=y&:embed=ys"
              height="500px"
              width="500px"
              scrollTo=""
            >
            </Map>
        </MapWrapper>
        </>
    )
}

export default DisparitiesMap;