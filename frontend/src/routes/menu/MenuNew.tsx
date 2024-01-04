import Search from "../../components/Search/Search";
import Banner from "../../components/Banner/Banner";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import MenuItems from "./MenuItems";

import CardItems from "@/components/Cart/CardItems";
export default function MenuNew() {
  return (
    <>
      <Search />
      <Banner />
      <div className=" grid grid-cols-1 md:grid-cols-[1fr_auto] ">
        <div>
          <div className="font-bold text-black text-2xl">Đề cử !!</div>
          <Tabs defaultValue="coffe">
            <TabsList className="w-full  flex justify-around bg-white ">
              <div className="w-full h-full flex justify-between">
                <div>
                  <TabsTrigger className="text-lg" value="coffe">
                    Cà Phê
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="milk">
                    Trà Sữa
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="cake">
                    Bánh
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="cream">
                    Kem
                  </TabsTrigger>
                </div>
              </div>
            </TabsList>
            <TabsContent value="coffe">
              <MenuItems type="cafe" sort="best-choice" />
            </TabsContent>
            <TabsContent value="milk">
              <MenuItems type="milk" sort="best-choice" />
            </TabsContent>
            <TabsContent value="cake">
              <MenuItems type="cake" sort="best-choice" />
            </TabsContent>
            <TabsContent value="cream">
              <MenuItems type="cream" sort="best-choice" />
            </TabsContent>
          </Tabs>

          <div className="font-bold text-[hsla(94,79%,35%,1)] text-2xl">
            Giảm giá !!!
          </div>
          <Tabs defaultValue="cream" className="w-full h-full ">
            <TabsList className="w-full  flex justify-around bg-white ">
              <div className="w-full h-full flex justify-between ">
                <div>
                  <TabsTrigger className="text-lg" value="coffe">
                    Cà Phê
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="milk">
                    Trà Sữa
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="cake">
                    Bánh
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="cream">
                    Kem
                  </TabsTrigger>
                </div>
              </div>
            </TabsList>
            <TabsContent value="coffe">
              <MenuItems type="cafe" sort="discount" />
            </TabsContent>
            <TabsContent value="milk">
              <MenuItems type="milk" sort="discount" />
            </TabsContent>
            <TabsContent value="cake">
              <MenuItems type="cake" sort="discount" />
            </TabsContent>
            <TabsContent value="cream">
              <MenuItems type="cream" sort="discount" />
            </TabsContent>
          </Tabs>
        </div>
        <CardItems />
      </div>
    </>
  );
}
