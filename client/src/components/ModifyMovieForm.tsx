import React, { useState, useContext } from "react";
import { Grid, Modal, Form } from "semantic-ui-react";
import { Formik } from "formik";

import { useModifyMovieMutation } from "../generated/graphql";
import DispatchContext from "../contexts/DispatchContext";
import { Movie } from "../reducers/movieReducer";

interface Errors {
  title?: string;
  url?: string;
  minutes?: string;
}

interface Props {
  movie: Movie;
  trigger: React.ReactNode;
}

function CreateMovieForm({ movie, trigger }: Props) {
  const dispatch = useContext<any>(DispatchContext);
  const [modifyMovie] = useModifyMovieMutation();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Modify a Movie</Modal.Header>
      <Modal.Content>
        <Grid centered>
          <Grid.Column width={8}>
            <Formik
              initialValues={{
                title: movie.title,
                url: movie.url,
                minutes: movie.minutes,
              }}
              validate={(values) => {
                const errors: Errors = {};

                if (!values.title) {
                  errors.title = "Required";
                }

                if (!values.url) {
                  errors.url = "Required";
                } else if (!/^https:\/\//.test(values.url)) {
                  errors.url = "enter a valid url";
                }

                if (!values.minutes) {
                  errors.minutes = "Required";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const modifiedMovie = {
                    id: movie.id,
                    url: values.url,
                    title: values.title,
                    minutes: Number(values.minutes),
                  };
                  const response = await modifyMovie({
                    variables: modifiedMovie,
                  });
                  setSubmitting(false);

                  if (response.data?.modifyMovie) {
                    dispatch({
                      type: "MODIFY_MOVIE",
                      payload: {
                        ...modifiedMovie,
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
                values,
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
                    value={values.title}
                    error={errors.title}
                  />
                  <Form.Input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    name="url"
                    label="Url"
                    value={values.url}
                    error={errors.url}
                  />

                  <Form.Input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    name="minutes"
                    label="Minutes"
                    value={values.minutes.toString()}
                    error={errors.minutes}
                  />
                  <Form.Button primary type="submit">
                    Modify movie
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
