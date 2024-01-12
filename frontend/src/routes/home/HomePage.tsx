import User from "../../type/User";
import api from "../../api/api";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useMe from "../../zustand/useMe";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setMe } = useMe();

  useEffect(() => {
    const refresh_token = searchParams.get("refresh_token");

    if (refresh_token) {
      api
        .post("/users/refresh-token", { refresh_token: refresh_token })
        .then((result) => {
          localStorage.setItem("access_token", result.data.access_token);
          localStorage.setItem("refresh_token", result.data.refresh_token);

          api.defaults.headers["Authorization"] =
            "Bearer " + result.data.access_token;

          return api.get("/users/@me/profile").then((result) => {
            const user: User = result.data;
            setMe(user);
          });
        })
        .catch((err) => {})
        .finally(() => {
          setSearchParams({});
        });
    }
  }, [searchParams, setMe, setSearchParams]);
  return (
    <div className="h-full md:p-20 p-4 md:text-white md:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex flex-col gap-4 justify-end items-start text-black">
      <p className="text-5xl font-bold">
        <span>Dating</span>
        <br />
        <span>
          with your <span className="text-[#007B0C]">style</span>
        </span>
      </p>
      <p className="max-w-md">
        Điểm đến lý tưởng cho các buổi hẹn lãng mạn. Với không gian ấm áp, menu
        đa dạng và không khí riêng tư, quán hứa hẹn tạo ra những trải nghiệm đặc
        biệt và nhớ mãi cho các cặp đôi.
      </p>
      <Button className="bg-[#007B0C] flex items-center justify-center" asChild>
        <Link to={routes.about}>Tìm hiểu thêm</Link>
      </Button>
    </div>
  );
}
