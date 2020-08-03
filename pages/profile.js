import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Header, Button } from "semantic-ui-react";

import ProfileDetail from "../components/ProfileDetail";
import ProfileForm from "../components/ProfileForm";
import { auth, firestore } from "../firebase/clientApp";
import withAuth from "../hocs/withAuth";

const Profile = ({ user }) => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [type, setType] = useState("create");
  const [profile, setProfile] = useState({ email: user.email });

  const profileRef = firestore.doc(`profile/${user.uid}`);

  useEffect(() => {
    if (user.uid) {
      generateProfile();
    }
  }, [user.uid]);

  const generateProfile = () => {
    profileRef.get().then(snapshot => {
      if (!snapshot.exists) {
        setIsEdit(true);
        setType("create");
      } else {
        setType("edit");
        setProfile(snapshot.data());
      }
    });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = values => {
    if (type === "create") {
      profileRef
        .set({ ...values })
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
          console.error("Error creating profile document", error);
        });
    } else {
      profileRef
        .update({ ...values })
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
          console.error("Error update profile document", error);
        });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "white",
          borderBottom: "1px solid #e0e6ed",
          zIndex: 2
        }}
      >
        <Header size="large" style={{ marginBottom: 0 }}>
          Profile
        </Header>
        <Button onClick={() => handleLogout()}>Logout</Button>
      </div>

      {isEdit ? (
        <ProfileForm profile={profile} onSave={handleSave} />
      ) : (
        <ProfileDetail profile={profile} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default withAuth(Profile);
