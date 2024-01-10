import Icons from "@/constants/icon";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function AddItemsAdmin() {
  return (
    <div className=" p-4 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Icons.Plus />
            Thêm món
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nhập thông tin sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="Tên sản phẩm"
                className="text-right whitespace-nowrap"
              >
                Tên sản phẩm
              </Label>
              <Input id="name" type="text" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Giá" className="text-right whitespace-nowrap">
                Giá
              </Label>
              <Input id="price" type="number" className="col-span-3 " />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ảnh" className="text-right whitespace-nowrap">
                Ảnh minh họa
              </Label>
              <Input id="image" type="image" className="col-span-3 " />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Mô tả" className="text-right whitespace-nowrap">
                Mô tả
              </Label>
              <Input id="description" type="text" className="col-span-3 " />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="Giảm giá"
                className="text-right whitespace-nowrap"
              >
                Giảm giá
              </Label>
              <Input id="discount" type="number" className="col-span-3 " />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="loại"
                className="text-right whitespace-nowrap"
              ></Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cafe">Cà phê</SelectItem>
                  <SelectItem value="cake">Bánh</SelectItem>
                  <SelectItem value="milk">Trà sữa</SelectItem>
                  <SelectItem value="cream">Kem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
