import React, { useContext } from "react";
import { Button, Grid, Form, Header } from "semantic-ui-react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import { useLoginMutation, UserFieldError } from "../generated/graphql";
import DispatchContext from "../contexts/DispatchContext";

interface Errors {
  email?: string;
  password?: string;
}

const toErrorMap = (errors: UserFieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};

function Login() {
  const [login] = useLoginMutation();
  const history = useHistory();
  const dispatch = useContext<any>(DispatchContext);

  return (
    <>
      <Header as="h1" textAlign="center">
        Login
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
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setTimeout(async () => {
                try {
                  const response = await login({
                    variables: {
                      email: values.email,
                      password: values.password,
                    },
                  });

                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                  }

                  if (response.data?.login.user) {
                    const user = JSON.stringify(response.data.login.user);
                    localStorage.setItem("user", user);
                    dispatch({
                      type: "LOGIN",
                      payload: response.data.login.user,
                    });
                    history.push("/profile");
                  }

                  setSubmitting(false);
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
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Login;
