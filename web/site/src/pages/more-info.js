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
    font-size: 2.00rem !important;
`

const SectionContent = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
    font-weight: 300 !important;
`

const InlineLink = styled.a`
    color: rgba(75,192,192,0.9);
`

const NumList = styled.ol`
  font-weight: 400;
  font-size: 1.25rem;
`

const List = styled.ul`
  font-weight: 300;
`

const ListItem = styled.li`

`
const RoundedButton = styled.a`
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    text-decoration: none;
    margin: 5px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background: white;
    border: none;
    color: #3b9090;
    border: #3b9090 solid 2px;
    font-family: Roboto;
    font-size: 1.00rem;
    transition: ease-in 0.15s;
    border-radius: 30px;
    
    &:hover {
        background: #3b9090;
        color: white;
        border: rgba(0,0,0,0) solid 2px;
        cursor: pointer;
    }
    &:active {
        background: #e6e6e6;
        color: rgba(1,1,1,0.6);
        border: rgba(1,1,1,0.6) solid 2px; 
        transition: 0.4s;
    }
    &:focus {
        outline: none;
    }

`

const SquareButton = styled(Button)`
  border-radius: 0px !important;
  margin: 5px !important;
`
const SectionWrapper = styled.div`
    border: solid white 1px;
    padding: 15px;
`

const MoreInfoPage = () => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    return(
        <>
        <Layout>
          <SEO 
            title="More Info" 
            description="In this research, we take the time to analyze and invstigate how people from under-privileged communities are disproportionately affected by the COVID-19 pandemic."
            lang="en"
            meta="Indiana COVID-19 & Health Equity"
         />
          {mobile ? '' : <Nav />}
          <br></br>
          <SectionWrapper>
          <SectionTitle 
            variant="h4" 
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
          <RoundedButton 

              href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-in-the-us.html?s_cid=bb-coronavirus-2019-ncov-NCIRD6"
          >
            Domestic Travel Updates
          </RoundedButton>
          <RoundedButton 

              href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/index.html?s_cid=bb-coronavirus-2019-ncov-NCIRD7"
          >
            International Travel Updates
          </RoundedButton>
          </SectionWrapper>
          <br></br>
          <SectionWrapper>
          <SectionTitle 
            variant="h4" 
            gutterBottom
           >
              Stress and Coping
          </SectionTitle>
          <SectionContent gutterBottom>
          The coronavirus disease 2019 (COVID-19) pandemic may be stressful for people. Fear and anxiety about a new disease and what could happen can be overwhelming and cause strong emotions in adults and children. Public health actions, such as social distancing, can make people feel isolated and lonely and can increase stress and anxiety. However, these actions are necessary to reduce the spread of COVID-19. Coping with stress in a healthy way will make you, the people you care about, and your community stronger.
          Stress and anxiety during a pandemic can cause the following:
          <List>
            <ListItem>Fear and worry about your own health and the health of your loved ones.</ListItem>
            <ListItem>Anxiety about your financial situation or job, or loss of support services you rely on.</ListItem>
            <ListItem>Changes in sleep or eating patterns.</ListItem>
            <ListItem>Difficulty sleeping and concentrating.</ListItem>
            <ListItem>Worsening of chronic health problems.</ListItem>
            <ListItem>Worsening of mental health conditions.</ListItem>
            <ListItem>Increased use of tobacco, and/or alcohol and other substances.</ListItem>
          </List>
          </SectionContent>
          </SectionWrapper>
          <br></br>
          <SectionWrapper>
          <SectionTitle 
            variant="h4" 
            gutterBottom
           >
               Pets and Other Animals
          </SectionTitle>
          <SectionContent gutterBottom>
            Coronaviruses are a large family of viruses. Some coronaviruses cause cold-like illnesses in people, while others cause illness in certain types of animals, such as cattle, camels, and bats. Some coronaviruses, such as canine and feline coronaviruses, infect only animals and do not infect humans.
          </SectionContent>
          <SectionContent gutterBottom>
          Some coronaviruses that infect animals can be spread to humans and then spread between people, but this is rare. This is what happened with the virus that caused the current outbreak of COVID-19, with the virus likely originating in bats. The first reported infections were linked to a live animal market, but the virus is now spreading from person to person.
          </SectionContent>
          <SectionContent gutterBottom>
          The virus that causes COVID-19 spreads mainly from person to person through respiratory droplets from coughing, sneezing, and talking. Recent studies show that people who are infected but do not have symptoms likely also play a role in the spread of COVID-19. At this time, there is no evidence that animals play a significant role in spreading the virus that causes COVID-19. Based on the limited information available to date, the risk of animals spreading COVID-19 to people is considered to be low. More studies are needed to understand if and how different animals could be affected by COVID-19.
          </SectionContent>
          </SectionWrapper>
          <br></br>
          <SectionWrapper>
          <SectionTitle 
            variant="h4" 
            gutterBottom
           >
               What To Do If You Are Sick
          </SectionTitle>
          <SectionContent gutterBottom>
            <NumList>
              <ListItem>
                Stay home except to get medical care
                <List style={{fontSize: '1.0rem'}}>
                  <ListItem>
                    Most people with COVID-19 have mild illness and can recover at home without medical care. Do not leave your home, except to get medical care. Do not visit public areas.
                  </ListItem>
                  <ListItem>
                    Get rest and stay hydrated. Take over-the-counter medicines, such as acetaminophen, to help you feel better.
                  </ListItem>
                  <ListItem>
                    Call before you get medical care. Be sure to get care if you have trouble breathing, or have any other emergency warning signs, or if you think it is an emergency.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                Separate yourself from other people
                <List style={{fontSize: '1.0rem'}}>
                  <ListItem>
                  As much as possible, stay in a specific room and away from other people and pets in your home.
                  </ListItem>
                  <ListItem>
                  If possible, you should use a separate bathroom. If you need to be around other people or animals in or outside of the home, wear a mask.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                Monitor your symptoms
                <List style={{fontSize: '1.0rem'}}>
                  <ListItem>
                    {<>
                      <InlineLink href="/stay-healthy">Symptoms</InlineLink> of COVID-19 include fever, cough, or other symptoms.
                      </>
                    }
                  </ListItem>
                  <ListItem>
                    Follow care instructions from your healthcare provider and local health department. Your local health authorities may give instructions on checking your symptoms and reporting information.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                Call ahead before visiting your doctor
                <List style={{fontSize: '1.0rem'}}>
                  <ListItem>
                    {<>
                      You don’t need to wear the mask if you are alone. If you can’t put on a mask (because of trouble breathing, for example), cover your coughs and sneezes in some other way. Try to stay at least 6 feet away from other people. This will help protect the people around you.
                      </>
                    }
                  </ListItem>
                  <ListItem>
                  Masks should not be placed on young children under age 2 years, anyone who has trouble breathing, or anyone who is not able to remove the mask without help.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                Cover your coughs and sneezes
                <List style={{fontSize: '1.0rem'}}>
                  <ListItem>
                    {<>
                      Cover your mouth and nose with a tissue when you cough or sneeze.
                      </>
                    }
                  </ListItem>
                  <ListItem>
                    Throw away used tissues in a lined trash can.
                  </ListItem>
                  <ListItem>
                    Immediately wash your hands with soap and water for at least 20 seconds. If soap and water are not available, clean your hands with an alcohol-based hand sanitizer that contains at least 60% alcohol.
                  </ListItem>
                </List>
              </ListItem>
            </NumList>
          </SectionContent>
          </SectionWrapper>
        </Layout>
        </>
    )
}

export default MoreInfoPage;