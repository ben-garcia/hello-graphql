import React, { useState, useContext } from "react";
import { Grid, Modal, Form } from "semantic-ui-react";
import { Formik } from "formik";

import { useCreateMovieMutation, FieldError } from "../generated/graphql";
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

interface Errors {
  title?: string;
  minutes?: string;
}

interface Props {
  trigger: React.ReactNode;
}

const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};

function CreateMovieForm({ trigger }: Props) {
  const {
    user: { id: userId },
  } = useContext(StateContext);
  const dispatch = useContext<any>(DispatchContext);
  const [createMovie] = useCreateMovieMutation();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Create a Movie</Modal.Header>
      <Modal.Content>
        <Grid centered>
          <Grid.Column width={8}>
            <Formik
              initialValues={{ title: "", minutes: 60 }}
              validate={(values) => {
                const errors: Errors = {};

                if (!values.title) {
                  errors.title = "Required";
                }

                if (!values.minutes) {
                  errors.minutes = "Required";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  const response = await createMovie({
                    variables: {
                      title: values.title,
                      minutes: Number(values.minutes),
                      user: userId,
                    },
                  });
                  setSubmitting(false);

                  if (response.data?.createMovie.errors) {
                    setErrors(
                      toErrorMap(response.data.createMovie.errors as any)
                    );
                  }

                  if (response.data?.createMovie.movie) {
                    dispatch({
                      type: "ADD_MOVIE",
                      payload: {
                        ...response.data.createMovie.movie,
                        user: { id: userId },
                      },
                    });
                    setOpen(false);
                  }
                } catch (e) {
                  console.log(e);
                }
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
                    type="text"
                    name="title"
                    label="Title"
                    error={errors.title}
                  />
                  <Form.Input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    name="minutes"
                    label="Minutes"
                    error={errors.minutes}
                  />
                  <Form.Button primary type="submit">
                    Add movie
                  </Form.Button>
                </Form>
              )}
            </Formik>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

export default CreateMovieForm;
