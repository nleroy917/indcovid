import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';

import { 
  IconButton,
  Grid,
  Button,
  useMediaQuery
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const HeaderWrapper = styled.header`
  min-height: 75px;
`

const SquareButton = styled(Button)`
  border-radius: 0px !important;
`

const ALink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const Header = ({ siteTitle }) => {
  const matches = useMediaQuery('(max-width:768px)');
  return(
  <HeaderWrapper
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
    <Grid container 
      direction="row" 
      alignItems="center"
      justify={matches ? "center" : "flex-end"}
      style={{width: '100%'}}
      spacing={2}
    >
      <Grid item>
      <ALink to="/about">
        <SquareButton variant="outlined" color="inherit" size="small">
          More Information
        </SquareButton>
        </ALink>
      </Grid>
      <Grid item>
      <ALink to="/about">
        <SquareButton variant="outlined" color="inherit" size="small">
          Stay Healthy
        </SquareButton>
        </ALink>
      </Grid>
    </Grid>

    </div>
  </HeaderWrapper>
)
    }

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
