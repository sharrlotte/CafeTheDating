import MenuAdminItems from "@/routes/admin/menuadmin/MenuAdminItems";
import { TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Tabs } from "../ui/tabs";

export default function MenuAdmin() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
      <div className="w-full h-full flex p-2 md:flex-row flex-col gap-2">
        <div className="w-full h-full">
          <Tabs defaultValue="all" className="w-full h-full">
            <TabsList className="w-full  flex justify-around bg-[hsla(50,200%,35%,1)] rounded-md p-8 font-bold text-2xl">
              <TabsTrigger
                className="hover:bg-white p-4 rounded-xl "
                value="all"
              >
                Tất Cả
              </TabsTrigger>
              <TabsTrigger
                className="hover:bg-white p-4 rounded-xl "
                value="coffe"
              >
                Cà Phê
              </TabsTrigger>
              <TabsTrigger
                className="hover:bg-white p-4 rounded-xl "
                value="milk"
              >
                Trà Sữa
              </TabsTrigger>
              <TabsTrigger
                className="hover:bg-white p-4 rounded-xl "
                value="cake"
              >
                Bánh
              </TabsTrigger>
              <TabsTrigger
                className="hover:bg-white p-4 rounded-xl "
                value="cream"
              >
                Kem
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <MenuAdminItems type="cafe" />
              <MenuAdminItems type="milk" />
              <MenuAdminItems type="cake" />
              <MenuAdminItems type="cream" />
            </TabsContent>
            <TabsContent value="coffe">
              <MenuAdminItems type="cafe" />
            </TabsContent>
            <TabsContent value="milk">
              <MenuAdminItems type="milk" />
            </TabsContent>
            <TabsContent value="cake">
              <MenuAdminItems type="cake" />
            </TabsContent>
            <TabsContent value="cream">
              <MenuAdminItems type="cream" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
