import Icons from "@/constants/icon";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Tên sản phẩm phải nhiều hơn 4 kí tự",
    })
    .max(40, { message: "Tên sản phẩm phải ít hơn 40 kí tự" }),

  description: z
    .string()
    .min(4, {
      message: "Tên sản phẩm phải nhiều hơn 4 kí tự",
    })
    .max(200, { message: "Tên sản phẩm phải ít hơn 200 kí tự" }),

  price: z
    .string()
    .min(4, {
      message: "Tên sản phẩm phải nhiều hơn 4 kí tự",
    })
    .max(100, { message: "Tên sản phẩm phải ít hơn 100 kí tự" }),

  product_type: z.string().min(1, {
    message: "Loại không được bỏ trống",
  }),

  tags: z.array(
    z.string().min(1, {
      message: "Ưu tiên không được bỏ trống",
    })
  ),

  image: z
    .custom<File>()
    .refine(
      (file) => {
        // Check if all items in the array are instances of the File object
        return file instanceof File;
      },
      {
        // If the refinement fails, throw an error with this message
        message: "Expected a file",
      }
    )
    .refine(
      (file) => ["png, jpg"].includes(file.type),
      "Chỉ nhận file .jpg, .png"
    ),
});

export default function AddItemsAdmin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      product_type: "",
      tags: [],
      image: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className=" p-4 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Icons.Plus />
            Thêm món
          </Button>
        </DialogTrigger>
        <DialogContent>
          <FormProvider {...form}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Tên sản phẩm sẽ hiển thị
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Giá sản phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder="Giá" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Mức ưu tiên sản phẩm</FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue="">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Mức ưu tiên" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="best-choice">
                              Best choice
                            </SelectItem>
                            <SelectItem value="new">New</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product_type"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Loại sản phẩm</FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue="">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Loại" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cafe">Cà phê</SelectItem>
                            <SelectItem value="milk">Trà sữa</SelectItem>
                            <SelectItem value="cream">Kem</SelectItem>
                            <SelectItem value="cake">Bánh</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Mô tả sản phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder="Mô tả" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Lưu</Button>
              </form>
            </Form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
