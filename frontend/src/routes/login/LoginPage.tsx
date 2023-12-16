import Icons from "../../constants/icon";
import { Button } from "../../components/ui/button";
import React from "react";
import { env } from "../../config/env";

export default function LoginPage() {
  return (
    <div className="bg-[hsla(0,31%,97%,1)] w-full flex flex-col justify-center items-center gap-10 p-8">
      <div className="w-5/6 bg-white shadow-2xl rounded-[34px] h-screen flex relative">
        <div className=" p-24  flex-col flex gap-4 z-10 w-1/2 relative justify-center items-center">
          <div className="flex justify-start items-start absolute left-2 top-4 w-32"></div>
          <div className="grid  items-center justify-center gap-8 ">
            <span className="text-4xl font-bold text-center">Log In</span>

            <Button
              asChild
              variant="outline"
              className="border-2 w-60 rounded-3xl gap-2  flex justify-start border-blue-200"
            >
              <a href={env.backend_url + "/auth/facebook"}>
                <Icons.Facebook /> Facebook
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 rounded-3xl gap-2 flex justify-start border-blue-200"
            >
              <a href={env.backend_url + "/auth/google"}>
                <Icons.Google />
                Google
              </a>
            </Button>
          </div>
          <div className="flex gap-4 justify-center text-xs">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
        <div className="flex absolute right-0 top-0 h-full">
          <img src="/img/BackgroundLogin.svg" alt="Login"></img>
        </div>
      </div>
    </div>
  );
}
