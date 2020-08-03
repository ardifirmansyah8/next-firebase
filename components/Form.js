import { Form, Checkbox, TextArea } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import get from "lodash/get";

export const InputField = ({
  field: { name, value },
  form: { errors, touched, setFieldValue },
  ...props
}) => {
  const error = get(errors, name);
  const touch = get(touched, name);

  return (
    <Form.Input
      value={value}
      onChange={event => {
        setFieldValue(name, event.target.value);
      }}
      {...props}
      error={touch && error}
    />
  );
};

export const DateField = ({
  field: { name, value },
  form: { errors, touched, setFieldValue },
  ...props
}) => {
  const error = get(errors, name);
  const touch = get(touched, name);

  return (
    <Form.Field
      control={SemanticDatepicker}
      value={value}
      onChange={(_event, data) => {
        setFieldValue(name, data.value);
      }}
      {...props}
      className="datefield"
      error={touch && error}
    />
  );
};

export const CheckboxField = ({
  field: { name, value },
  form: { errors, touched, setFieldValue },
  ...props
}) => {
  const error = get(errors, name);
  const touch = get(touched, name);

  return (
    <Form.Field
      control={Checkbox}
      onChange={(_event, data) => {
        setFieldValue(name, data.checked);
      }}
      {...props}
      checked={value}
      error={touch && error}
    />
  );
};

export const TextAreaField = ({
  field: { name, value },
  form: { errors, touched, setFieldValue },
  ...props
}) => {
  const error = get(errors, name);
  const touch = get(touched, name);

  return (
    <Form.Field
      control={TextArea}
      value={value}
      onChange={(_event, data) => {
        setFieldValue(name, data.value);
      }}
      {...props}
      error={touch && error}
    />
  );
};
