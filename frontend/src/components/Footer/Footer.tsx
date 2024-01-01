import Icons from "../../constants/icon";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white  p-4 w-full ">
      <div className="border-[1px] border-blue-600"></div>
      <div className="p-24 flex justify-between flex-wrap gap-6">
        <div className="flex  items-center">
          <a href="/home">
            <img src="/img/Logo.svg" alt="TheDating"></img>
          </a>
        </div>
        <div className="gap-8 flex flex-col">
          <div className="flex flex-col">
            <span className="flex items-center gap-4">
              <Icons.Location></Icons.Location>
              150, Bình Quới, Phường 27, Quận Bình Thạnh, TP.Hồ Chí Minh
            </span>
            <span className="flex justify-between ">
              <div className="flex gap-2">
                <Icons.Phone></Icons.Phone>
                (84+) 0772 322 999999
              </div>
              <div className="flex gap-2">
                <Icons.Fax></Icons.Fax>
                <span>thedating@gmail.com</span>
              </div>
            </span>
          </div>
          <div className="flex gap-6 text-gray-500">
            <span>Social Media</span>
            <Icons.FacebookSmall></Icons.FacebookSmall>
            <Icons.GoogleSmall></Icons.GoogleSmall>
            <Icons.Wifi></Icons.Wifi>
          </div>
        </div>
      </div>
      <div className="border-[0.25px] border-blue-100 "></div>
      <div className="text-xs gap-8 flex font-bold p-2">
        <span>ABOUT US</span>
        <span>CONTACT US</span>
        <span>HELP</span>
        <span>PRIVACY POLICY</span>
        <span>DISCLAIMER</span>
      </div>
      <span className=" text-gray-400 flex justify-end">Copyright © 2023</span>
    </footer>
  );
}
