"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, ChangeEvent } from "react";

export default function AddProductRight() {
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                placeholder="Product Name"
                // onChange={(e) =>
                //   setProductInputVals({
                //     ...productInputVals,
                //     productName: e.target.value,
                //   })
                // }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Product Description"
                className="min-h-32"
                // onChange={(e) =>
                //   setProductInputVals({
                //     ...productInputVals,
                //     productDescription: e.target.value,
                //   })
                // }
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Price Detail</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Price</TableHead>
                <TableHead>Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input
                    id="price-1"
                    type="number"
                    defaultValue="9"
                    // onChange={(e) =>
                    //   setProductInputVals({
                    //     ...productInputVals,
                    //     price: {
                    //       small: e.target.value,
                    //       medium: productInputVals?.price?.medium,
                    //       large: productInputVals?.price?.large,
                    //     },
                    //   })
                    // }
                  />
                </TableCell>
                <TableCell>
                  <ToggleGroup type="single" defaultValue="s" variant="outline">
                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                  </ToggleGroup>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input
                    id="price-2"
                    type="number"
                    defaultValue="2"
                    // onChange={(e) =>
                    //   setProductInputVals({
                    //     ...productInputVals,
                    //     price: {
                    //       small: productInputVals?.price?.small,
                    //       medium: e.target.value,
                    //       large: productInputVals?.price?.large,
                    //     },
                    //   })
                    // }
                  />
                </TableCell>
                <TableCell>
                  <ToggleGroup type="single" defaultValue="m" variant="outline">
                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                  </ToggleGroup>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label htmlFor="price-3" className="sr-only">
                    Stock
                  </Label>
                  <Input
                    id="price-3"
                    type="number"
                    defaultValue="1"
                    // onChange={(e) =>
                    //   setProductInputVals({
                    //     ...productInputVals,
                    //     price: {
                    //       small: productInputVals?.price?.small,
                    //       medium: productInputVals?.price?.medium,
                    //       large: e.target.value,
                    //     },
                    //   })
                    // }
                  />
                </TableCell>
                <TableCell>
                  <ToggleGroup type="single" defaultValue="l" variant="outline">
                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                  </ToggleGroup>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card
        className="overflow-hidden w-full h-auto"
        x-chunk="dashboard-07-chunk-4"
      >
        <CardHeader className="flex flex-row gap-[150px]">
          <div className="flex flex-col gap-[10px]">
            <CardTitle>Product Images</CardTitle>
            <CardDescription>
              Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
          </div>
          <Input
            className="w-[300px] color-white"
            // onChange={imageChangeHandler}
            type="file"
          ></Input>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            {/* {uploadedImages?.map((imageUrl: string, index: number) => {
              return (
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  src={imageUrl}
                  height="200"
                  width="200"
                  key={index}
                />
              );
            })} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
