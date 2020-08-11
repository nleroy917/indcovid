import React from 'react';
import styled from 'styled-components';
import { 
    Typography,
    useMediaQuery
 } from '@material-ui/core';

const Title = styled(Typography)`
    font-weight: 400;
    font-size: ${props => props.mobile ? '1.25rem' : '1.75rem'};
    text-align: ${props => props.textAlign ? props.textAlign : ''};
    color: inherit;
`

const SectionTitle = ( { children, textAlign } ) => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    return(
        <>
        <Title 
          mobile={mobile} 
          variant="h3"
          textAlign={textAlign}
        >
            {children}
        </Title>
        </>
    )
}

export default SectionTitle;