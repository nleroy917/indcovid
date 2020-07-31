import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import vince from "../images/vince.gif"
import { Placeholder } from "../components/placeholder-div"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Placeholder>
      <p>404: I don't know where that resource is...</p>
    </Placeholder>
  </Layout>
)

export default NotFoundPage
