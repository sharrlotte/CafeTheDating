import Icons from "../../constants/icon";
import { Button } from "../../components/ui/button";
import React from "react";
import { env } from "../../config/env";

export default function LoginPage() {
  return (
    <div className="md:bg-[hsla(0,31%,97%,1)] w-full flex flex-col justify-center items-center gap-10 mt-2 py-1  md:p-8">
      <div className=" w-full md:w-5/6 bg-white shadow-2xl rounded-[34px] h-screen flex relative">
        <div className=" md:p-24  flex-col flex gap-4 z-10 w-full md:w-1/2 relative justify-center items-center">
          <div className=" flex flex-col  items-center justify-center gap-8 ">
            <span className="text-4xl font-bold text-center">Đăng Nhập</span>

            <Button
              asChild
              variant="outline"
              className=" border-2 rounded-3xl gap-2 flex  justify-start items-center border-blue-200 w-60"
            >
              <a href={env.backend_url + "/auth/google"}>
                <Icons.Google />
                Google
              </a>
            </Button>
          </div>
          <div className="text-white md:text-black flex gap-4 justify-center text-xs font-bold ">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
        <div className="flex absolute right-0 top-0 h-full">
          <img
            className="hidden"
            src="/img/BackgroundLogin.svg"
            alt="Login"
          ></img>
          <img
            className=""
            src="/img/BackGroundLoginSmall.png"
            alt="Login"
          ></img>
        </div>
      </div>
    </div>
  );
}
