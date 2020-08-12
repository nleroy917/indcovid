import React from 'react';
import styled from 'styled-components';
import { 
    Typography,
    useMediaQuery
 } from '@material-ui/core';

const SubTitle = styled(Typography)`
    font-weight: 400 !important;
    font-size: ${props => props.mobile ? '1.0rem !important' : '1.75rem !important'};
    text-align: ${props => props.textAlign ? props.textAlign : ''};
    color: inherit;
`

const SectionSubTitle = ( { children, textAlign } ) => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    return(
        <>
        <SubTitle 
          mobile={mobile} 
          variant="h3"
          textAlign={textAlign}
        >
            {children}
        </SubTitle>
        </>
    )
}

export default SectionSubTitle;