import React, { useState, useContext } from "react";
import { Grid, Modal, Form } from "semantic-ui-react";
import { Formik } from "formik";

import { useModifyCommentMutation } from "../generated/graphql";
import DispatchContext from "../contexts/DispatchContext";

interface Errors {
  content?: string;
}

interface Props {
  commentId: string;
  content: string;
  trigger: React.ReactNode;
}

function ModifyCommentForm({ commentId, content, trigger }: Props) {
  const dispatch = useContext<any>(DispatchContext);
  const [modifyComment] = useModifyCommentMutation();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Modify a Comment</Modal.Header>
      <Modal.Content>
        <Grid centered>
          <Grid.Column width={8}>
            <Formik
              initialValues={{
                content,
              }}
              validate={(values) => {
                const errors: Errors = {};

                if (!values.content) {
                  errors.content = "Required";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const modifiedComment = {
                    id: commentId,
                    content: values.content,
                  };

                  const response = await modifyComment({
                    variables: modifiedComment,
                  });
                  setSubmitting(false);

                  console.log(response);

                  if (response.data?.modifyComment.comment) {
                    dispatch({
                      type: "MODIFY_COMMENT",
                      payload: response.data?.modifyComment.comment,
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
                    name="content"
                    label="Content"
                    value={values.content}
                    error={errors.content}
                  />
                  <Form.Button disabled={isSubmitting} primary type="submit">
                    Modify comment
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

export default ModifyCommentForm;
