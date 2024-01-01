import { Button } from "../../components/ui/button";

import Icons from "../../constants/icon";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import CardItems from "../../components/Cart/CardItems";
import useCart from "../../zustand/useCart";
import Search from "../../components/Search/Search";
import Banner from "../../components/Banner/Banner";
import MenuItems from "./MenuItems";
import { pricy } from "../../lib/util";

export default function MenuPage() {
  const { products } = useCart();

  return (
    <div className="w-full">
      <Search />
      <Banner />
      <div className="p-4 flex w-full flex-row">
        <div className="w-full h-full flex p-2">
          <div className="w-full h-full">
            <Tabs defaultValue="coffe" className="w-full h-full" >
              <TabsList className="w-full  flex justify-around">
                <TabsTrigger value="coffe">Cà Phê</TabsTrigger>
                <TabsTrigger value="milk">Trà Sữa</TabsTrigger>
                <TabsTrigger value="cake">Bánh</TabsTrigger>
                <TabsTrigger value="cream">Kem</TabsTrigger>
              </TabsList>
              <TabsContent value="coffe">
                <MenuItems type="cafe" />
              </TabsContent>

              <TabsContent value="milk">
                <MenuItems type="milk" />
              </TabsContent>
              <TabsContent value="cake">
                <MenuItems type="cake" />
              </TabsContent>
              <TabsContent value="cream">
                <MenuItems type="cream" />
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-[300px] ">
            <div className=" bg-[hsla(26,87%,51%,1)] text-center h-24 justify-center items-center flex text-white text-3xl">
              <Icons.Cart />
              Giỏ Hàng
            </div>
            <div className="rounded-sm border-2  divide-y text-center max-h-[50%] overflow-auto">
              <CardItems></CardItems>
            </div>

            <div className="flex flex-col p-2 gap-4  rounded-lg border-2 ">
              <div className="flex  justify-evenly">
                <Button className="rounded-[30px] bg-[hsla(0,0%,93%,1)] text-black hover:bg-[hsla(26,87%,51%,1)] flex flex-col  h-24">
                  <img
                    src="/img/DeliveryScooter.svg"
                    alt="DeliveryScooter"
                  ></img>
                  Đặt Về
                </Button>

                <div className="border"></div>
                <Button className="rounded-[30px] bg-[hsla(0,0%,93%,1)] text-black  hover:bg-[hsla(26,87%,51%,1)] flex flex-col h-24">
                  <img src="/img/NewStore.svg" alt="NewStore"></img>
                  Đặt Bàn
                </Button>
              </div>
              <div className="border"></div>
              <div className="flex flex-col text-lg">
                <div className="flex justify-between">
                  <span className=" font-bold">Thành tiền</span>
                  <span>
                    {pricy(
                      products
                        .map((item) => item.count * item.price)
                        .reduce((prev, curr) => prev + curr, 0)
                    )}
                  </span>
                </div>

                <span className=" font-bold">Giảm giá</span>
                <span className=" font-bold">Phí vận chuyển</span>
                <div className="flex justify-between text-lg">
                  <span className=" font-bold"> Tổng :</span>
                  <span>
                    {pricy(
                      products
                        .map((item) => item.count * item.price)
                        .reduce((prev, curr) => prev + curr, 0)
                    )}
                    vnd
                  </span>
                </div>
              </div>
              <div className="border"> </div>
              <div className="flex justify-center">
                <Button className="border-2 rounded-3xl bg-[hsla(0,0%,97%,1)] text-black hover:bg-[hsla(26,87%,51%,1)] w-60 flex justify-between">
                  Mã giảm giá
                  <Icons.ArrowRight></Icons.ArrowRight>
                </Button>
              </div>
              <div></div>
              <div className="border "> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
