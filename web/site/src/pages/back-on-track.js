import React from 'react';
import styled from 'styled-components';

import Layout from "../components/layout";
import SEO from "../components/seo";

import {
    useMediaQuery,
    Typography
} from '@material-ui/core';

import Nav from '../components/nav';
import ReopeningTimeline from '../components/reopeningtimeline';

const SectionTitle = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
`

const InlineLink = styled.a`
    color: rgba(75,192,192,0.9);
`

const SectionContent = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
    font-weight: 300 !important;
`

const BackOnTrack = () => {

    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });

    return (
    <>
    <Layout>
      <SEO 
        title="Back On Track" 
        description="In this research, we take the time to analyze and invstigate how people from under-privileged communities are disproportionately affected by the COVID-19 pandemic."
        lang="en"
        meta="Indiana COVID-19 & Health Equity"
        />
      {mobile ? '' : <Nav />}
      <SectionTitle gutterBottom variant="h4">
          Indiana's "Back-on-Track" Plan
        </SectionTitle>
        <SectionContent gutterBottom>
          The state of Indiana has committed to <InlineLink href="https://backontrack.in.gov/">a 4-Stage plan</InlineLink> to get Indiana "back on track". Included in this plan are systems in place to slowly and safely open our small businesses, gyms, restaurants, entertainment venues, and social gatherings to get our economy going again while keeping Hoosier's safe. It is important that we follow the guidelines and mandates set in place to get using moving to the next stage as quikcly as possible.
        </SectionContent>
        <ReopeningTimeline />
    </Layout>
    </>
    )
}

export default BackOnTrack;