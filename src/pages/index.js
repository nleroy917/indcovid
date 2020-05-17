import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

// import sections
import Landing from '../components/landing'
import SiteMap from '../components/sitemap'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Landing/>
    <SiteMap/>
  </Layout>
)

export default IndexPage
