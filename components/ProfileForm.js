import { useRef } from "react";
import {
  Container,
  Grid,
  Image,
  Form,
  Button,
  Header,
  Icon
} from "semantic-ui-react";
import { withFormik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import fromUnixTime from "date-fns/fromUnixTime";

import {
  InputField,
  PhotoField,
  DateField,
  CheckboxField,
  TextAreaField
} from "../components/Form";

const ProfileForm = ({ uid, handleSubmit, values, isLoading }) => {
  const photoRef = useRef();
  const logoRef = useRef([]);
  const imgPlaceholder =
    "https://react.semantic-ui.com/images/wireframe/image.png";

  return (
    <Container style={{ margin: "100px 0" }}>
      <Form onSubmit={() => handleSubmit()}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image
                src={values.photo ? values.photo : imgPlaceholder}
                size="small"
                rounded
                style={{ cursor: "pointer" }}
                onClick={() => photoRef.current.click()}
              />
              <Field
                uid={uid}
                photoRef={photoRef}
                name="photo"
                component={PhotoField}
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <Field
                label="Name"
                placeholder="Name"
                type="text"
                name="name"
                component={InputField}
              />

              <Field
                label="Age"
                type="number"
                name="age"
                min="1"
                max="100"
                component={InputField}
              />

              <Field
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
                component={InputField}
              />

              <FieldArray
                name="experiences"
                render={arrayHelpers => (
                  <>
                    <Header
                      size="medium"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      Work Experiences:
                      <Button
                        primary
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            title: "",
                            company: "",
                            logo: null,
                            recent: false,
                            startDate: "",
                            endDate: "",
                            description: ""
                          })
                        }
                      >
                        Add Experience
                      </Button>
                    </Header>

                    {values.experiences.map((experience, index) => {
                      return (
                        <Grid key={index} style={{ marginTop: 10 }}>
                          <Grid.Row>
                            <Grid.Column width={2}>
                              <Image
                                size="tiny"
                                rounded
                                src={
                                  experience.logo
                                    ? experience.logo
                                    : imgPlaceholder
                                }
                                style={{ cursor: "pointer" }}
                                onClick={() => logoRef.current[index].click()}
                              />
                              <Field
                                photoRef={el => (logoRef.current[index] = el)}
                                name={`experiences.${index}.logo`}
                                component={PhotoField}
                              />
                            </Grid.Column>
                            <Grid.Column width={13}>
                              <Field
                                label="Title"
                                placeholder="Title"
                                type="text"
                                name={`experiences.${index}.title`}
                                component={InputField}
                              />

                              <Field
                                label="Company Name"
                                placeholder="Company Name"
                                type="text"
                                name={`experiences.${index}.company`}
                                component={InputField}
                              />

                              <Field
                                label="I am currently working in this role"
                                name={`experiences.${index}.recent`}
                                component={CheckboxField}
                              />

                              <Form.Group widths="equal">
                                <Field
                                  label="Start Date"
                                  name={`experiences.${index}.startDate`}
                                  component={DateField}
                                />

                                <Field
                                  label="End Date"
                                  disabled={experience.recent}
                                  name={`experiences.${index}.endDate`}
                                  component={DateField}
                                />
                              </Form.Group>

                              <Field
                                label="Job Description"
                                name={`experiences.${index}.description`}
                                component={TextAreaField}
                              />
                            </Grid.Column>
                            <Grid.Column width={1}>
                              {values.experiences.length > 1 && (
                                <Icon
                                  name="trash alternate outline"
                                  size="large"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => arrayHelpers.remove(index)}
                                />
                              )}
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      );
                    })}
                  </>
                )}
              />
              <div style={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  color="orange"
                  loading={isLoading}
                  disabled={isLoading}
                  style={{ marginTop: 50, width: "25%" }}
                >
                  Save
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Container>
  );
};

export default withFormik({
  mapPropsToValues: ({ profile }) => {
    let experiences = null;
    if (profile.experiences) {
      experiences = [...profile.experiences];
      experiences.map(exp => {
        exp.startDate = exp.startDate
          ? fromUnixTime(exp.startDate.seconds)
          : "";
        exp.endDate = exp.endDate ? fromUnixTime(exp.endDate.seconds) : "";
      });
    }

    return {
      name: profile.name ? profile.name : "",
      email: profile.email,
      age: profile.age ? profile.age : undefined,
      photo: profile.photo ? profile.photo : null,
      experiences: experiences
        ? experiences
        : [
            {
              title: "",
              company: "",
              recent: false,
              startDate: "",
              logo: null,
              endDate: "",
              description: ""
            }
          ]
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please input your name"),
    age: Yup.number().required("Please input your age"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please input your email"),
    experiences: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        company: Yup.string().required("Required"),
        recent: Yup.boolean(),
        startDate: Yup.string().required("Required"),
        endDate: Yup.string().when("recent", {
          is: false,
          then: Yup.string().required("Required")
        }),
        description: Yup.string().required("Required")
      })
    )
  }),
  handleSubmit: (values, { props }) => {
    props.onSave(values);
  }
})(ProfileForm);
