import React from 'react';
import styled from 'styled-components';

// import timeline component
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { 
    Typography, Button,
 } from '@material-ui/core';
import MoreInfoPage from '../pages/more-info';


const StageIconWrapper = styled.div`
    border-radius: 50%;
    border: white 4px solid;
    background-color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

const StageIconText = styled(Typography)`
    font-weight: 800 !important;
    font-size: 2.5rem !important;
    color: black;
`
const ElementTitle = styled(Typography)`
    color: inherit !important;
    font-weight: 400 !important;
    font-size: 1.75rem !important;
`

const ElementSubTitle = styled(Typography)`
    color: inherit !important;
    font-weight: 300 !important;
    font-size: 1.5rem !important;
`

const ElementContent = styled(Typography)`
    color: inherit !important;
    font-weight: 300 !important;
    font-size: 0.75 rem !important;
`

const MoreInfoButton = styled(Button)`
    border-radius: 0px !important;
    font-size: 0.5 rem !important;
    margin-top: 5px !important;
`

const StageIcon = ( { stageNum } ) => {
    return (
        <>
            <StageIconWrapper>
                <StageIconText variant="h1">
                    {stageNum}
                </StageIconText>
            </StageIconWrapper>
        </>
    )
}

const ReopeningTimeline = () =>  {
    return (
        <>
        <VerticalTimeline>
            <VerticalTimelineElement
             date="March 23 - May 3"
             icon={<StageIcon stageNum={1}/>}
             contentStyle={{ background: '#0e0e0e', color: '#fff', border: 'white 1px solid' }}
             iconStyle={{ background: '#FFF' }}
            >
               <ElementTitle variant="h2">
                   Stage One
               </ElementTitle>
               <ElementContent>
                    Essential manufacturing, construction, infrastructure, government, business, healthcare, and other critical businesses, retail businesses providing necessities of life such as grocery stores, pharmacies, hardware, building materials, and more open as outlined in Executive Order 20-22. Restaurants and bars may offer carryout, curbside, and delivery services. Retail stores may offer call-in or online ordering with curbside pickup and delivery. State parks are open. Golf courses are open. Only essential travel is allowed. Social gatherings with no more than 10 people are allowed. K-12 school buildings are closed and all activities are canceled until June 30.
               </ElementContent>
               <MoreInfoButton 
                variant="outlined" 
                color="inherit" 
                size="small"
                href="https://backontrack.in.gov/files/BackOnTrack-IN_WhatsOpen-Closed-stage1.pdf"
               >
                Stage 1 Info
               </MoreInfoButton>
            </VerticalTimelineElement>
            <VerticalTimelineElement
             date="May 4th - May 21st"
             icon={<StageIcon stageNum={2}/>}
             contentStyle={{ background: '#0e0e0e', color: '#fff', border: 'white 1px solid' }}
             iconStyle={{ background: '#FFF' }}
            >
               <ElementTitle variant="h2">
                   Stage Two
               </ElementTitle>
               <ElementContent>
               Essential manufacturing, construction, infrastructure, government, business, healthcare, and other critical businesses, retail businesses providing necessities of life such as grocery stores, pharmacies, hardware, building materials remain open. Personal services like hair and nails may open by appointment only. Gyms and fitness centers remain closed. Bars and nightclus remain closed. Restaurants may open at 50% capacity. Social entertainment venues like sports, movies, and concerts are prohibited.
               </ElementContent>
               <MoreInfoButton 
                 variant="outlined" 
                 color="inherit" 
                 size="small"
                 href="https://backontrack.in.gov/files/BackOnTrack-IN_WhatsOpen-Closed-stage2.pdf"
               >
                Stage 2 Info
               </MoreInfoButton>
            </VerticalTimelineElement>
            <VerticalTimelineElement
             date="May 22nd - June 13th"
             icon={<StageIcon stageNum={3}/>}
             contentStyle={{ background: '#0e0e0e', color: '#fff', border: 'white 1px solid' }}
             iconStyle={{ background: '#FFF' }}
            >
               <ElementTitle variant="h2">
                   Stage Three
               </ElementTitle>
               <ElementContent>
                Continue with remote work as much as possible. Face coverings are recommended. Social gatherings up to 100 people are permitted. No travel restrictions. Retail stores at 75% capacity. Malls at 50% capacity. Community pools may open according to guidelines. Gyms and fitness centers may open following guidlines. Bars, nightclubs, amusement parks, and sporting events are to remain closed
               </ElementContent>
               <MoreInfoButton 
                 variant="outlined" 
                 color="inherit" 
                 size="small"
                 href="https://backontrack.in.gov/files/BackOnTrack-IN_WhatsOpen-Closed-stage3.pdf"
               >
                Stage 3 Info
               </MoreInfoButton>
            </VerticalTimelineElement>
            <VerticalTimelineElement
             date="June 12th - July 3rd"
             icon={<StageIcon stageNum={4}/>}
             contentStyle={{ background: '#0e0e0e', color: '#fff', border: 'white 1px solid' }}
             iconStyle={{ background: '#FFF' }}
            >
               <ElementTitle variant="h2">
                   Stage Four
               </ElementTitle>
               <ElementContent>
                Social gatherings up to 250 people may take place. Face coverings are recommended. Retail stores and malls open at full capacity. Bars and nightclubs may open at 50% capacity. Cultural, entiertainment, and tourism sites may open at 50% capacity. Dining room service may open at 75% capacity. Continue remote work as needed.
               </ElementContent>
               <MoreInfoButton 
                 variant="outlined" 
                 color="inherit" 
                 size="small"
                 href="https://backontrack.in.gov/files/Stage_4.pdf"
               >
                Stage 4 Info
               </MoreInfoButton>
            </VerticalTimelineElement>
            <VerticalTimelineElement
             style={{bodShadow: 'none'}}
             date="July 4th - August 27th"
             icon={<StageIcon stageNum={4.5}/>}
             contentArrowStyle={{ borderRight: '7px solid  green' }}
             contentStyle={{ background: '#0e0e0e', color: '#fff', border: 'green 2px solid', boxShadow: 'none'}}
             iconStyle={{ background: '#FFF' }}
            >
               <ElementTitle variant="h2">
                   Stage Four Point Five
               </ElementTitle>
               <ElementSubTitle variant="h4">
                   (We are here)
               </ElementSubTitle>
               <ElementContent>
                Face coverings are required! Social gatherings up to 250 people are permitted. Dining room service may operate at 75% capacity. Retail stores and malls open at full capacity. Bars and nightclubs may open at 50% capacity. Cultural, entiertainment, and tourism sites may open at 50% capacity. Continue remote work as needed. Hospital visitiations encouraged with precautions.
               </ElementContent>
               <MoreInfoButton 
                 variant="outlined" 
                 color="inherit" 
                 size="small"
                 href="https://backontrack.in.gov/files/Stage4.5_Aug-1_update.pdfs"
               >
                Stage 4.5 Info
               </MoreInfoButton>
            </VerticalTimelineElement>
            <VerticalTimelineElement
             date="TBD"
             icon={<StageIcon stageNum={5}/>}
             contentStyle={{ background: '#0e0e0e', color: '#fff', border: 'white 2px solid'}}
             iconStyle={{ background: '#FFF' }}
            >
               <ElementTitle variant="h2">
                   Stage Five
               </ElementTitle>
               <ElementContent gutterBottom>
                TBD
               </ElementContent>
               <MoreInfoButton 
                 variant="outlined" 
                 color="inherit" 
                 size="small"
                 href="https://backontrack.in.gov/files/Stage5_Aug-1_update.pdf"
               >
                Stage 5 Info
               </MoreInfoButton>
            </VerticalTimelineElement>
        </VerticalTimeline>
        </>
    )
}

export default ReopeningTimeline;