import { useState } from "react";
import { useRouter } from "next/router";

import { auth } from "../firebase/clientApp";

export const useLogin = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const login = (email, pwd) => {
    setIsLoading(true);

    auth
      .signInWithEmailAndPassword(email, pwd)
      .then(res => {
        router.push("/profile");
      })
      .catch(error => {
        setErrorMsg(error.message);
        setIsLoading(false);
      });
  };

  return [isLoading, errorMsg, login];
};
