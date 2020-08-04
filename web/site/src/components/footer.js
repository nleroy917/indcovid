import React from 'react';
import styled from 'styled-components';

import {
    Grid,
    useMediaQuery,
    Typography
} from '@material-ui/core';

const Footer = styled.footer`
    border-top: 1px grey solid;
    color: inherit;
    padding: 20px;
    margin: 10px;
`

const FooterText = styled(Typography)`
    color: inherit !important;
    font-weight: 300 !important;
    font-size: 10px !important;
    padding: 4px;
    text-align: center;
`

const PageFooter = () => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    const iPad = useMediaQuery('(max-device-width:768px)', { noSsr: true });
    return(
        <>
          <Footer
            mobile={mobile}
          >
            <Grid container
                direction="row"
                alignItems="center"
                justify="space-between"
            >
              <Grid item lg={4} md={4} xs={10}>
                <FooterText>
                    Contact:
                    <br></br>
                    indianacovid@gmail.com
                </FooterText>
              </Grid>
              <Grid item lg={4} md={4} xs={10}>
                <FooterText>
                  <em>
                    All data displayed is preliminary and subject to change as more information is reported to ISDH. Expect historical data to change as data is reported to ISDH.
                  </em>
                </FooterText>
              </Grid>
              <Grid item lg={4} md={4} xs={10}>
                <FooterText>
                    Web-Design: Nathan LeRoy
                </FooterText>
              </Grid>
            </Grid>
          </Footer>
        </>
    )
}

export default PageFooter;