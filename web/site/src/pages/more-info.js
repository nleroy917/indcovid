import React from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Placeholder } from "../components/placeholder-div";
import InfoSection from '../components/moreinfosection';
import Nav from '../components/nav';

import barnabas from '../images/barnabas.jpg';
import nathan from '../images/nathan.png';
import mph_logo from '../images/mph-logo.svg';

import {
  Button,
  useMediaQuery
} from '@material-ui/core';

const SquareButton = styled(Button)`
  border-radius: 0px !important;
  padding: 5px !important;
  margin-bottom: 15px !important;
`

const InlineLink = styled.a`
    color: rgba(75,192,192,0.9);
`

const ALink = styled(Link)`
  color: inherit;
  font-size: 0.75rem;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const MediaWrapper = styled.div`
    display: flex !important;
    justify-content: center !important;
`

const ImgLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const Img = styled.img`
    overflow: hidden;
    border-radius: 50%;
    transition: ease 0.1s;
    width: 150px;
    height: 150px;
    margin: 10px;
    border: white 1px solid;
    &:hover {
      cursor: pointer;
      box-shadow: 5px 5px white, 4px 4px white, 3px 3px white, 2px 2px white, 1px 1px white;
      transform: translate(-5px, -5px);
    }
    &:active {
        transform: translate(-4px,-4px);
        box-shadow: 4px 4px white, 3px 3px white, 2px 2px white, 1px 1px white;
    }
`

const MoreInfoPage = () => {

    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    const iPadPro = useMediaQuery('(max-device-width:1024px)', { noSsr: true });

    return (
    <Layout>
      <SEO title="More Info" />
      <Nav />
      <InfoSection
        title="Developers"
        content="This site was developed by Nathan LeRoy and Barnabas Obeng-Gyasi. Both graduates of Purdue University, Nathan now works for the Indiana Biosciences Research Institute as an Assistant Research Associate. Barnabas currently works as a Senior Research Assistant at Duke University and is preparing for medical school. Most of the web design and system architecture was developed by Nathan, while Barnabas worked to incorporate visual map data with ArcGIS and developed the Python back-end for calculating our various metrics within the lens of health equity."
        media={
            <>
              <MediaWrapper>
                <ImgLink href="https://www.linkedin.com/in/nathanjleroy/">
                   <Img src={nathan} />
                </ImgLink>
                <ImgLink href="https://www.linkedin.com/in/barnabas-obeng-gyasi-8baba3191/">
                   <Img src={barnabas} style={{backgroundSize: '200%'}}/>
                </ImgLink>
              </MediaWrapper>
            </>
        }
      />
      <br></br>
      <InfoSection
        title="Data Sources"
        content={<><div>Our data is pulled from <InlineLink href="https://hub.mph.in.gov/dataset?q=COVID">Indiana Data Hub's</InlineLink> daily updated statistics on coronavirus. This is then run through the program ArcGIS to create map data. Analysis takes this data and frames it within a <InlineLink href="https://www.graham-center.org/rgc/maps-data-tools/sdi/social-deprivation-index.html">deprivation index</InlineLink> which gives us a set of societal domains to evaluate the statistics. This allows us to identify the potential for different race-based and socioeconomic disparities in communities in indiana.</div>
        <div style={{padding: '5px', fontSize: '0.9rem'}}>
        <em>Note: No direct conclusions were drawn from the data simply the identification for areas of inequity and the visualization of the pandemic.</em>
        </div></>}
        media={
            <>
              <MediaWrapper>
                <img 
                  src={mph_logo} 
                  style={{margin:'10px'}}
                />
              </MediaWrapper>
            </>
        }
      />
    </Layout>
  )
}
  
  export default MoreInfoPage;
  