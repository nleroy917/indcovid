import React from "react"
import styled from 'styled-components'

import Layout from "../components/layout"
import SEO from "../components/seo"
import vince from "../images/vince.gif"

const Container = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;

`

const NotFound = styled.h1`
  font-weight: 300;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <NotFound>404: I don't know where that resource is...</NotFound>
      <img src={vince} alt="Vince from Pulp Fiction looking around"></img>
      <NotFound>...but it ain't here, chief.</NotFound>
      </Container>
  </Layout>
)

export default NotFoundPage
