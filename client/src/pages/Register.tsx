import React from "react";
import { Button, Grid, Form, Header } from "semantic-ui-react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";

import { REGISTER } from "../mutations";

interface Errors {
  email?: string;
  password?: string;
}

function Register() {
  const [register] = useMutation(REGISTER);

  return (
    <>
      <Header as="h1" textAlign="center">
        Register
      </Header>
      <Grid centered>
        <Grid.Column width={8}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors: Errors = {};

              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.trim().length <= 2) {
                errors.password = "Invalid password length";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              register({
                variables: { email: values.email, password: values.password },
              });
              setSubmitting(false);
            }}
          >
            {({
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form
                size="large"
                onSubmit={handleSubmit}
                loading={isSubmitting}
                error
              >
                <Form.Input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  label="Email"
                  error={errors.email}
                />
                <Form.Input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  label="Password"
                  error={errors.password}
                />
                <Button primary type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Register;
