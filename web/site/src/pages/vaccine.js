import React from 'react';
import styled from 'styled-components';

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from '../components/nav';

import {
    useMediaQuery,
    Typography,
} from '@material-ui/core';

const SectionTitle = styled(Typography)`
    font-weight: 400;
    color: inherit;
    font-size: 2.00rem !important;
    text-align: center;
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
    text-decoration: none;
    margin: 5px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background: white;
    border: none;
    color: #3b9090;
    border: #3b9090 solid 2px;
    font-family: inherit;
    font-size: ${props => props.mobile ? '0.75rem' : '1.00rem'};
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

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${props => props.mobile ? 'column' : 'row'};
    justify-content: center;
    align-items: center;

`

const SectionWrapper = styled.div`
    border: solid white 1px;
    padding: 15px;
`
const VaccinePage = () => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    return (
        <>
        </>
    )
}

export default VaccinePage;