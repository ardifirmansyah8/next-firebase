import {
  Container,
  Grid,
  Image,
  Button,
  Icon,
  Header
} from "semantic-ui-react";

const ProfileDetail = ({ profile, onEdit }) => {
  return (
    <Container style={{ marginTop: 100 }}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/image.png"
              size="small"
              rounded
            />
            <Button
              primary
              fluid
              style={{ marginTop: 15, width: "80%" }}
              onClick={() => onEdit()}
            >
              Edit Profile
            </Button>
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as="h3">
              <Icon name="user" />
              <Header.Content>
                {profile.name}
                <Header.Subheader>{profile.age} Years Old</Header.Subheader>
              </Header.Content>
            </Header>

            <Header as="h3">
              <Icon name="mail" />
              <Header.Content>{profile.email}</Header.Content>
            </Header>

            <Header size="medium">Work Experiences:</Header>

            {profile.experiences &&
              profile.experiences.map((data, idx) => (
                <Grid key={idx} style={{ marginTop: 10 }}>
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <Image
                        src="https://react.semantic-ui.com/images/wireframe/image.png"
                        size="tiny"
                        rounded
                      />
                    </Grid.Column>
                    <Grid.Column width={14}>
                      <div>
                        <Header as="h3">
                          <Header.Content>
                            {data.company}{" "}
                            <span style={{ fontStyle: "italic" }}>
                              ({data.title})
                            </span>
                            <Header.Subheader>
                              {data.startDate} -{" "}
                              {data.recent ? "PRESENT" : data.endDate}
                            </Header.Subheader>
                          </Header.Content>
                        </Header>
                        <div>{data.description}</div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default ProfileDetail;
