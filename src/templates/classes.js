import { graphql } from "gatsby"
import React from "react"
import styles from "./classes.module.css"
import cx from "classnames"
import Img from "gatsby-image"
import { TextLink, ButtonLink } from "../components/links"
import SEO from "../components/seo"

export default function ClassesTemplate({ data }) {
  const { body, frontmatter } = data.mdx

  return (
    <>
      <SEO title="Classes" />
      <div className={styles.top}>
        <h1>Classes</h1>
        <p>
          Lightwoods House in Bearwood is currently closed due to Covid-19
          restrictions. Luckily, we are continuing Baby Yoga and Massage classes
          online so you don't miss out while staying safe. I can also give
          Postnatal Support to new Mums by phone or video.{" "}
          <TextLink to="/contact">Get in touch</TextLink> for more info or make
          a <TextLink to="/booking">booking enquiry</TextLink> to join.
        </p>
      </div>
      <div className={styles.root}>
        {/* <div></div> */}
        {frontmatter.cards.map(card => (
          <div key={card.title} className={styles.card}>
            <Img
              className={styles.cardImage}
              fluid={card.image.childImageSharp.fluid}
            />
            <div>
              <h3>{card.title}</h3>
              <p>{card.location}</p>
              <div className={cx(styles.date, "space-x-2")}>
                <h4>{card.day}</h4>
                <h4>{card.time}</h4>
              </div>
              <div className={styles.price}>
                <h3>{card.price}</h3>
                <h3>{card.duration}</h3>
              </div>
            </div>
          </div>
        ))}
        <div>
          <h3>Ready to join a class?</h3>
          <ButtonLink to="/booking">Book now</ButtonLink>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query ClassesTemplateQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        cards {
          title
          image {
            childImageSharp {
              fluid(maxWidth: 640, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          location
          day
          time
          price
          duration
        }
      }
    }
  }
`
