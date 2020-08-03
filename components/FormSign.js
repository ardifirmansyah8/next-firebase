import { Container, Card, Form, Message, Button } from "semantic-ui-react";
import { withFormik, Field } from "formik";

import { InputField } from "../components/Form";

const FormSign = ({
  title,
  btnText,
  isLoading,
  handleSubmit,
  errorMsg,
  isRegister
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Card style={{ padding: 15, width: 400 }}>
          <div style={{ margin: "15px 0", fontWeight: "bold", fontSize: 18 }}>
            {title}
          </div>
          <Form onSubmit={() => handleSubmit()} error={errorMsg !== ""}>
            <Field
              fluid
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              component={InputField}
            />
            <Field
              fluid
              label="Password"
              placeholder="Password"
              type="password"
              name="pwd"
              component={InputField}
            />
            <Message error={errorMsg !== ""} content={errorMsg} />
            <Button
              fluid
              primary
              loading={isLoading}
              disabled={isLoading}
              type="submit"
              style={{ marginTop: 15 }}
            >
              {btnText}
            </Button>
          </Form>

          {isRegister ? (
            <div style={{ marginTop: 15, textAlign: "center" }}>
              <label>
                <a href="/">Back to login</a>
              </label>
            </div>
          ) : (
            <div style={{ marginTop: 15, textAlign: "center" }}>
              <label>
                Don't have an account? <a href="/register">Sign Up!</a>
              </label>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: () => ({ email: "", pwd: "" }),
  validate: values => {
    const errors = {};

    if (!values.email) {
      errors.email = "Please input your email";
    }

    if (!values.pwd) {
      errors.pwd = "Please input your password";
    }

    return errors;
  },
  handleSubmit: (values, { props }) => {
    props.onSubmit(values.email, values.pwd);
  }
})(FormSign);
