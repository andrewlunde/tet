import * as PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'

type PostPageMetaProps = {
  commentTitle?: string
  commentContent?: string
}

export const PostPageMeta = ({ commentTitle, commentContent }: PostPageMetaProps) => {
  const title = `${commentTitle} | TET`
  const description = commentContent

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}

PostPageMeta.propTypes = {
  commentTitle: PropTypes.string,
  commentContent: PropTypes.string,
}

PostPageMeta.defaultProps = {
  commentTitle: 'TET',
  commentContent: 'Buy videos with 0% fee',
}
