import { graphql } from "gatsby"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { CheckBox, Label, Submit, TextField } from "../components/inputs"
import SEO from "../components/seo"
import styles from "./booking.module.css"
import Spinner from "../components/spinner"

const Booking = ({ data }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: yup.object().shape({
      name: yup.string().required("Required"),
      email: yup.string().required("Required").email("Invalid email address"),
      phone: yup
        .string()
        .required("Required")
        .matches(/^\+?[0-9\s]{7,15}$/, "Invalid phone number"),
      age: yup.string(),
      interest: yup.object().test({
        test: o => Object.keys(o).reduce((acc, k) => acc || o[k], false),
        message: "Choose at least one",
      }),
    }),
    mode: "onBlur",
  })
  const [state, setState] = useState("initial")
  function onSubmit(formData) {
    setState("loading")
    fetch("/api/contact/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.status === 200) {
          setState("success")
        } else {
          setState("error")
        }
      })
      .catch(() => void setState("error"))
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
          <TextField
            name="name"
            label="Name:"
            error={errors?.name ?? false}
            ref={register}
          />
          <TextField
            name="email"
            label="Email:"
            error={errors?.email ?? false}
            ref={register}
          />
          <TextField
            name="phone"
            label="Phone number:"
            error={errors?.phone ?? false}
            ref={register}
          />
          <TextField
            name="age"
            label="Baby's age:"
            error={errors?.age ?? false}
            ref={register}
          />
          <div className={styles.select}>
            <Label htmlFor="interest">Interested in:</Label>
            {data.mdx.frontmatter.cards
              .map(card => card.title)
              .map(function (title) {
                return (
                  <div key={title}>
                    <CheckBox
                      id={title}
                      ref={register}
                      name={`interest.${title}`}
                    />
                    <Label htmlFor={title}>{title}</Label>
                  </div>
                )
              })}
            {errors?.interest && (
              <div className={styles.error}>{errors.interest.message}</div>
            )}
          </div>
          <div className={styles.submit}>
            {(state === "initial" || state === "error") && <Submit />}
            {state === "loading" && <Spinner />}
            {state === "success" && <div>Thank you!</div>}
            {state === "error" && (
              <div className={styles.error}>Please try again</div>
            )}
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
