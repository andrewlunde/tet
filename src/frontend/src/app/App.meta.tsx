import React from 'react'
import { Helmet } from 'react-helmet'

export const AppMeta = () => (
  <Helmet>
    <title>Pay-per-minute online classes | TET</title>
    <meta name="description" content="Buy videos with 0% fee" />
    <meta property="og:title" content="TET" />
    <meta property="og:url" content="https://tet.io" />
    <meta property="og:site_name" content="TET" />
    <meta property="og:type" content="article" />
    <meta property="og:description" content="TET" />
    <meta property="og:image" content="/ogimage.png" />
  </Helmet>
)
