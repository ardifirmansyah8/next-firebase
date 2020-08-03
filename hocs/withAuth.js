import { useState, useEffect } from "react";
import router from "next/router";
import { Loader } from "semantic-ui-react";

import { auth } from "../firebase/clientApp";

const withAuth = Component => {
  return props => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      auth.onAuthStateChanged(authUser => {
        setIsLoading(false);
        if (!authUser) {
          router.push("/");
        } else {
          setUser(authUser);
        }
      });
    }, []);

    return isLoading ? <Loader active /> : <Component {...props} user={user} />;
  };
};
export default withAuth;
