import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import og_image from '../images/landing-screenshot.png';

const siteUrl = 'https://indcovid.com'

function SEO({ description, lang, meta, title }) {

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title="Indiana COVID-19 & Health Equity"
      meta={[
        {
          name: `description`,
          content: 'On this site, we investigate how people from communities who historically face health disparities are disproportionately affected by the COVID-19 pandemic.',
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: `Nathan LeRoy and Barnabas-Obeng-Gyasi`,
        },
        {
          name: `twitter:title`,
          content: `Indiana COVID-19 & Health Equity`,
        },
        {
          name: `twitter:description`,
          content: `On this site, we investigate how people from communities who historically face health disparities are disproportionately affected by the COVID-19 pandemic.`,
        },
        {
          name: `og:title`,
          content: `Indiana COVID-19 & Health Equity`
        },
        {
          name: `og:description`,
          content: `On this site, we investigate how people from communities who historically face health disparities are disproportionately affected by the COVID-19 pandemic.`
        },
        {
          name: `og:url`,
          content: `https://indcovid.com`
        },
        {
          name: `og:image`,
          content: `${siteUrl}${og_image}`
        }
      ].concat(meta)}
    >
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: 'Indiana COVID-19 & Health Equity',
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
