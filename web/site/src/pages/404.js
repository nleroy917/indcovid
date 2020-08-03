import React from "react"
import styled from 'styled-components';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Placeholder } from "../components/placeholder-div";
import {
  Button
} from '@material-ui/core';

const SquareButton = styled(Button)`
  border-radius: 0px !important;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Placeholder>
      <p>404: Unkown Page</p>
      <SquareButton variant="outlined" size="large" color="inherit" href="/">
        Go Back
      </SquareButton>
    </Placeholder>
  </Layout>
)

export default NotFoundPage
