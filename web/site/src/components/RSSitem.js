import React from 'react';
import styled from 'styled-components';
import { 
    Paper,
    Typography,
 } from '@material-ui/core';

const Wrapper = styled(Paper)`
    background-color: #1d1d1d !important;
    font-weight: 400;
    color: inherit !important;
    padding: 20px;
    margin: 10px;
    width: 200px;
`

const Title = styled(Typography)`
`

const Description = styled(Typography)`
`

const RSSItem = ( { title, desc} ) => {
    return(
        <>
            <Wrapper
                square={true}
            >
                <Title variant="body 1">
                    {title}
                </Title>
                <Description variant="body 2">
                    {desc}
                </Description>
            </Wrapper>
        </>
    )
}

export default RSSItem;