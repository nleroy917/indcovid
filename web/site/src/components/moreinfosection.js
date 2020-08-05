/*
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

Section component for /more-info page
*/

import React, {useState, useEffect} from "react";
import styled from 'styled-components';

import {
    Grid,
    Typography,
    useMediaQuery
} from '@material-ui/core';

const SectionTitle = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
`

const SectionContent = styled(Typography)`
    color: inherit;
    font-size: 1.75rem;
    font-weight: 300 !important;
`

const InfoSection = ({title, content, media}) => {

    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    const iPadPro = useMediaQuery('(max-device-width:1024px)', { noSsr: true });

    return(
        <>
        <Grid container
            direction="row"
            alignItems="center"
            justify={mobile ? "center" : "flex-start"}
            style={{width: '100%'}}
        >
            <Grid item xs={12} sm={6} md={7} lg={7} xl={7}>
              <SectionTitle
                variant="h4"
                gutterButtom
              >
                {title}
              </SectionTitle>
              <SectionContent
                variant="body1"
                >
                {content}
               </SectionContent>
            </Grid>
            <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
                {media}
            </Grid>
        </Grid>
        </>
    )

}

export default InfoSection;