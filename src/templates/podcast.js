import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import { formatPodcastTime } from '../utils/helpers'

class PodcastTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1
          style={{
            fontFamily: `proxima-nova, serif`,
            fontWeight: `900`,
            fontSize: `3rem`,
          }}
        >
          {"🎙 " + post.frontmatter.title}
        </h1>
        <p
          style={{
            fontFamily: `franklin-gothic, sans-serif`,
            color: `hsla(0, 100%, 18%, .75)`,
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-4 / 5),
          }}
        >
          {post.frontmatter.date}
          {` !!!! ${formatPodcastTime(post.frontmatter.time)}`}
        </p>
        <div
          style={{
            fontFamily: `franklin-gothic, sans-serif`,
            fontSize: `1.2rem`,
            fontWeight: `500`,
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default PodcastTemplate

export const pageQuery = graphql`
  query PodcastsBySlug {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { type: { ne: "podcast"  } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        lang
        type
        source
        cover {publicURL}
        time
        size
        episode
        episodeType
        mentions {type, text, url, isbn}
      }
    }
  }
`
