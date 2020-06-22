import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'


const Bold = ({ children }) => <h2><strong>{children}</strong></h2>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.contentfulBlogPost
    console.log(post)

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.heroImage ?
                            <figure className="post-feature-image">
                                <img src={ post.heroImage.fluid.src } alt={ post.title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>
                            {post.body && post.body.json && documentToReactComponents(post.body.json, options)}
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        contentfulBlogPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            body: PropTypes.shape({
                json: PropTypes.object.isRequired
            }),
            heroImage: PropTypes.shape({
                fluid: PropTypes.shape({
                    src: PropTypes.string
                })
            }),
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        contentfulBlogPost(slug: { eq: $slug }) {
            ...contentfulPostFields
        }
    }
`
