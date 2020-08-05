import React from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Placeholder } from "../components/placeholder-div";
import InfoSection from '../components/moreinfosection';

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
      <SEO title="404: Not found" />
      <ALink to="/">
        <SquareButton variant="outlined" color="inherit">
            Home
        </SquareButton>
      </ALink>
      <InfoSection
        title="Developers"
        content="This site was developed by Nathan LeRoy and Barnabas Obeng-Gyasi. Both graduates of Purdue University, Nathan now works for the Indiana Biosciences Research Institute as an Assistant Research Associate. Barnabas currently works as a research assistant at Duke University and is preparing for medical school. Most of the web design and system architecture was developed by Nathan, while Barnabas worked to develop the Python back-end for calculating our various metrics."
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
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        media={
            <>
              <MediaWrapper>
                <img src={mph_logo} />
              </MediaWrapper>
            </>
        }
      />
    </Layout>
  )
}
  
  export default MoreInfoPage;
  