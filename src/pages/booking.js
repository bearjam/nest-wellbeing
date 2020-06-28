import React from "react"
import styles from "./booking.module.css"
import { useForm } from "react-hook-form"
import { graphql } from "gatsby"
import { TextInput, Submit, Label, CheckBox } from "../components/inputs"
import SEO from "../components/seo"
import yup from "yup"

let formDataSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().required("Required").email("Invalid email address"),
  phone: yup
    .string()
    .required("Required")
    .matches(/^\+?[0-9\s]{7,15}$/, "Invalid phone number"),
  age: yup.string(),
  interestedIn: yup.object().test({
    test: o => Object.keys(o).reduce((acc, k) => acc || o[k], false),
    message: "Choose at least one",
  }),
})

const Booking = ({ data }) => {
  const { register, handleSubmit } = useForm({
    validationSchema: formDataSchema,
  })
  let titles = data.mdx.frontmatter.cards.map(x => x.title)
  function onSubmit(formData) {
    fetch("/api/contact/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(console.log)
      .catch(console.log)
  }
  return (
    <div className={styles.root}>
      <SEO title="Booking" />
      <h1>Booking Form</h1>
      <p>
        To book a class or wellbeing session, Vanessa needs a few details about
        you and your baby. Submit the form and Vanessa will send you a message
        to book your place. You can choose more than one option.
      </p>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <Label htmlFor="name">Name:</Label>
            <TextInput id="name" ref={register} name="name" />
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <TextInput id="email" ref={register} name="email" />
          </div>
          <div>
            <Label htmlFor="phone">Phone number:</Label>
            <TextInput id="phone" ref={register} name="phone" />
          </div>
          <div>
            <Label htmlFor="age">Baby's age:</Label>
            <TextInput id="age" ref={register} name="age" />
          </div>
          <div className={styles.select}>
            <Label htmlFor="interest">Interested in:</Label>
            {titles.map(function (title) {
              return (
                <div key={title}>
                  <CheckBox id={title} ref={register} name={`class.${title}`} />
                  <Label htmlFor={title}>{title}</Label>
                </div>
              )
            })}
          </div>
          <div className={styles.submit}>
            <Submit />
          </div>
        </form>
      </div>
    </div>
  )
}

export const query = graphql`
  query MyQuery {
    mdx(frontmatter: { templateKey: { eq: "classes" } }) {
      frontmatter {
        cards {
          title
        }
      }
    }
  }
`

export default Booking
