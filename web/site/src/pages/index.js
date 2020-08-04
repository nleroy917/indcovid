import React from "react"

import Layout from "../components/layout";
import SEO from "../components/seo";
import Landing from '../components/landing';
import PageFooter from '../components/footer';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Landing/>
    <PageFooter />
  </Layout>
)

export default IndexPage
