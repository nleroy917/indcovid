import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Placeholder } from "../components/placeholder-div"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Placeholder>
      <p>Building something beautiful today?</p>
      <p>Start right here!</p>
    </Placeholder>
  </Layout>
)

export default IndexPage
