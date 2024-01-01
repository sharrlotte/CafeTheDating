import Search from "../../components/Search/Search";
import Banner from "../../components/Banner/Banner";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import MenuItems from "./MenuItems";
export default function MenuNew() {
  return (
    <>
      <Search />
      <Banner />
      <div>
        <Tabs defaultValue="coffe" className="w-full h-full p-4">
          <TabsList className="w-full  flex justify-around bg-white ">
            <div className="w-full h-full flex justify-between ">
              <div className="font-bold text-black text-2xl">
                Sale Up Now !!
              </div>
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
        <Tabs defaultValue="cream" className="w-full h-full p-4">
          <TabsList className="w-full  flex justify-around bg-white ">
            <div className="w-full h-full flex justify-between ">
              <div className="font-bold text-[hsla(94,79%,35%,1)] text-2xl">
                Best Rating !!!
              </div>
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
    </>
  );
}
