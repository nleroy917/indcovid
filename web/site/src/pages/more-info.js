import React from 'react';
import styled from 'styled-components';

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from '../components/nav';

import {
    useMediaQuery,
    Typography,
    Button
} from '@material-ui/core';

const SectionTitle = styled(Typography)`
    font-weight: 400;
    color: inherit;
    font-size: 1.60rem;
`

const SectionContent = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
    font-weight: 300 !important;
`

const InlineLink = styled.a`
    color: rgba(75,192,192,0.9);
`

const List = styled.ul`
font-weight: 300;
`

const ListItem = styled.li`

`

const SquareButton = styled(Button)`
  border-radius: 0px !important;
  margin: 5px !important;
`

const MoreInfoPage = () => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    return(
        <>
        <Layout>
          <SEO title="More Info" />
          {mobile ? '' : <Nav />}
          <br></br>
          <SectionTitle 
            variant="h3" 
            gutterBottom
           >
              Travel Restrictions
          </SectionTitle>
          <SectionContent gutterBottom>
          {
          <p>Travel increases your chance of getting and spreading COVID-19. <b>Staying home is the best way to protect yourself and others from COVID-19.</b></p>
          }
          </SectionContent>
          <SectionContent gutterBottom>
          You can get COVID-19 during your travels. You may feel well and not have any symptoms, but you can still spread COVID-19 to others. You and your travel companions (including children) may spread COVID-19 to other people including your family, friends, and community for 14 days after you were exposed to the virus.
          </SectionContent>
          <SectionContent gutterBottom>
          <b>Don’t travel if you are sick</b> or if you have been around someone with COVID-19 in the past 14 days. Don’t travel with someone who is sick. <b>Before you travel, consider the following:</b>
          <List>
              <ListItem>Is <InlineLink href="https://www.cdc.gov/covid-data-tracker/index.html#cases">COVID-19 spreading</InlineLink> at your travel destination?</ListItem>
              <ListItem>Do you live with someone who is <InlineLink href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-at-higher-risk.html">at risk of serious illness</InlineLink> from COVID-19?</ListItem>
              <ListItem>Does your destination have requirements or restrictions for travelers?</ListItem>
            </List>
          </SectionContent>
        </Layout>
        </>
    )
}

export default MoreInfoPage;