import React from "react";
import Search from "../Search/Search";

export default function About() {
  return (
    <>
      <Search></Search>
      <div className="h-full p-3">
        <div className=" ">
          <span className="text-5xl  flex justify-center  p-10">
            Hiểu hơn về The Dating !
          </span>
        </div>
        <div className="h-100 bg-[hsla(0,0%,85%,1)] flex justify-center items-center  p-2">
          <div className="">
            <div className="flex justify-center items-center">
              <span className=" bg-[hsla(32,98%,51%,1)] rounded-2xl flex items-center justify-center w-[480px] h-10 font-bold">
                Cách The Dating phục vụ bạn
              </span>
            </div>
            <div className="flex p-8 gap-10 justify-between items-center">
              <div className="bg-white h-80 w-80 flex flex-col justify-center items-center p-4 gap-2">
                <span className=" text-black font-bold text-center ">
                  Đặt tại quán !
                  <img
                    className="p-2"
                    src="/img/ShopOrder.svg"
                    alt="Loading"
                  ></img>
                </span>
                <span className="text-[hsla(0,0%,0%,1)] text-lg text-center h-60 w-60">
                  Đặt hàng nhanh chóng ngay tại quán ăn
                </span>
              </div>
              <div className="bg-white h-80 w-80 flex flex-col justify-center items-center p-4 gap-8">
                <span className=" text-black font-bold text-center">
                  Sản phẩm chất lượng
                  <img
                    className="p-2"
                    src="/img/QualityFood.svg"
                    alt="Loading"
                  ></img>
                </span>
                <span className="text-[hsla(0,0%,0%,1)] text-lg text-center h-60 w-60">
                  Ngon , an toàn và đẹp mắt
                </span>
              </div>
              <div className="bg-white h-80 w-80 flex flex-col justify-center items-center p-4 gap-4">
                <span className=" text-black font-bold text-center">
                  Tiện lợi
                  <img
                    className="p-2"
                    src="/img/ConvenienceFood.svg"
                    alt="Loading"
                  ></img>
                </span>
                <span className="text-[hsla(0,0%,0%,1)] text-lg text-center h-60 w-60">
                  Nhanh gọn và dễ sử dụng.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
