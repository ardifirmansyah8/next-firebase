import { Form, Checkbox, TextArea } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import get from "lodash/get";

import { storage } from "../firebase/clientApp";

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

export const PhotoField = ({
  field: { name, value },
  form: { errors, touched, setFieldValue },
  photoRef,
  uid
}) => {
  // const error = get(errors, name);
  // const touch = get(touched, name);

  return (
    <input
      type="file"
      accept="image/*"
      hidden
      ref={photoRef}
      onChange={event => {
        const reader = new FileReader();
        const photoRef = storage
          .ref()
          .child(`${uid}/${event.currentTarget.files[0].name}`);

        reader.onloadend = () => {
          photoRef.putString(reader.result, "data_url").then(async snapshot => {
            const url = await snapshot.ref.getDownloadURL();
            console.log(url);
            setFieldValue(name, url);
          });
        };

        reader.readAsDataURL(event.currentTarget.files[0]);
      }}
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
