import React from 'react'
import { Helmet } from 'react-helmet'

export const ForumMeta = () => {
  const title = `Forum | TET`
  const description = `The TET forum`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
