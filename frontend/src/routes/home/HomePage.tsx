import User from "../../type/User";
import api from "../../api/api";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useMe from "../../zustand/useMe";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setMe = useMe((state) => state.setMe);

  useEffect(() => {
    searchParams.get("refresh_token");
    const refresh_token = searchParams.get("refresh_token");
    api
      .post("/users/refresh-token", { refresh_token: refresh_token })
      .then((result) => {
        localStorage.setItem("refresh_token", result.data.refresh_token);
        localStorage.setItem("access_token", result.data.access_token);

        api.defaults.headers["Authorization"] =
          "Bearer " + result.data.access_token;

        api.get("/users/@me/profile").then((result) => {
          const user: User = result.data;
          setMe(user);
        });
      })
      .catch((err) => {});
  }, []);
  return <div></div>;
}
