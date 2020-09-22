import React from "react";
import { Button, Grid, Form, Header } from "semantic-ui-react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import { useRegisterMutation } from "../generated/graphql";

interface Errors {
  email?: string;
  password?: string;
}

function Register() {
  const [register] = useRegisterMutation();
  const history = useHistory();

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
              setTimeout(async () => {
                try {
                  const response = await register({
                    variables: {
                      email: values.email,
                      password: values.password,
                    },
                  });
                  setSubmitting(false);

                  if (response?.data?.register) {
                    history.push("/login");
                  }
                } catch (e) {
                  console.log(e);
                }
              }, 1000);
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
