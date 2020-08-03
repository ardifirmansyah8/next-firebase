import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Header, Button } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";

import ProfileDetail from "../components/ProfileDetail";
import ProfileForm from "../components/ProfileForm";
import { auth, firestore } from "../firebase/clientApp";
import withAuth from "../hocs/withAuth";

const Profile = ({ user }) => {
  const router = useRouter();
  const { addToast } = useToasts();

  const [isEdit, setIsEdit] = useState(false);
  const [type, setType] = useState("create");
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const profileRef = firestore.doc(`profile/${user.uid}`);

  useEffect(() => {
    if (user.uid) {
      generateProfile();
    }
  }, [user.uid]);

  const generateProfile = () => {
    const spec = localStorage.getItem("profileSpec");
    if (spec) {
      handleSave(JSON.parse(spec));
    } else {
      profileRef.get().then(snapshot => {
        if (!snapshot.exists) {
          setProfile({ email: user.email });
          setType("create");
          setIsEdit(true);
        } else {
          setType("edit");
          setProfile(snapshot.data());
        }
      });
    }
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
    setIsLoading(true);
    localStorage.setItem("profileSpec", JSON.stringify(values));

    if (type === "create") {
      profileRef
        .set({ ...values })
        .then(() => onSaveSuccess())
        .catch(error => {
          setIsLoading(false);
          addToast("Error creating profile document", {
            appearance: "error",
            autoDismiss: true
          });
          console.error("Error creating profile document", error);
        });
    } else {
      profileRef
        .update({ ...values })
        .then(() => onSaveSuccess())
        .catch(error => {
          setIsLoading(false);
          addToast("Error updating profile document", {
            appearance: "error",
            autoDismiss: true
          });
          console.error("Error updating profile document", error);
        });
    }
  };

  const onSaveSuccess = () => {
    localStorage.removeItem("profileSpec");
    addToast("Successfully saving profile", {
      appearance: "success",
      autoDismiss: true
    });
    setTimeout(() => window.location.reload(), 2500);
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
        <ProfileForm
          profile={profile}
          onSave={handleSave}
          isLoading={isLoading}
        />
      ) : (
        <ProfileDetail profile={profile} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default withAuth(Profile);
