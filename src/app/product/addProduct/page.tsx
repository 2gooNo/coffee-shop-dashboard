"use client";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useAddProductMutation,
  useGetAllCategoryQuery,
} from "../../../../generated";
import { gql, useMutation } from "@apollo/client";

export default function AddProduct() {
  const [image, setImage] = useState<File | undefined>();
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allCategory, setAllCategory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const router = useRouter();
  const [productInputVals, setProductInputVals] = useState({
    imageUrl: "",
    price: {
      small: "",
      medium: "",
      large: "",
    },
    productDescription: "",
    productName: "",
  });

  const [
    addProductMutation,
    {
      data: addProductData,
      loading: addProductLoading,
      error: addProductError,
    },
  ] = useAddProductMutation();
  // mutation AddTodo($type: String!) {
  //   addTodo(type: $type) {
  //     id
  //     type
  //   }
  // }
  const GQL = gql`
    mutation addProduct($input: addProductInput) {
      imageURL
      name
      price {
        small
        medium
        large
      }
      description
      categoryId
    }
  `;
  const [testMutation, { data, loading: a, error }] = useMutation(GQL);
  const {
    data: getAllCategoryData,
    loading: getAllCategoryLoading,
    error: getAllCategoryError,
  } = useGetAllCategoryQuery();

  const imageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      console.log("setting image");
    }
  };

  const sendImageHandler = async () => {
    setLoading(true);
    console.log("Handler is running");
    console.log(image);
    if (image) {
      const formData = new FormData();

      formData.append("file", image);

      const res = await fetch(" http://localhost:8000/api/addProductImg", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });
      const response = await res.json();
      console.log(response);
      const imageUrl = await response.url;
      setUploadedImages([...uploadedImages, imageUrl]);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!image || uploadedImages?.length > 2) {
      console.log("image is null or undefined");
    } else {
      sendImageHandler();
    }
    console.log("uploadedImages", uploadedImages);
  }, [image]);
  useEffect(() => {
    if (getAllCategoryData?.getAllCategory) {
      setAllCategory(getAllCategoryData?.getAllCategory);
    }
  }, [getAllCategoryData]);
  async function AddProduct() {
    // await addProductMutation({
    //   variables: {
    //     input: {
    //       name: productInputVals?.productName,
    //       description: productInputVals?.productDescription,
    //       price: productInputVals?.price,
    //       imageURL: uploadedImages,
    //       categoryId: selectedCategory?._id,
    //     },
    //   },
    // });
    const variables = {
      input: {
        name: productInputVals?.productName,
        description: productInputVals?.productDescription,
        price: productInputVals?.price,
        imageURL: uploadedImages,
        categoryId: selectedCategory?._id,
      },
    };
    console.log(variables);
    await testMutation({
      variables,
    });
    router.push("./productTable");
  }

  return (
    <div className="mx-auto mt-[40px] grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button onClick={() => AddProduct()} size="sm">
            Add Product
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
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
                    onChange={(e) =>
                      setProductInputVals({
                        ...productInputVals,
                        productName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Product Description"
                    className="min-h-32"
                    onChange={(e) =>
                      setProductInputVals({
                        ...productInputVals,
                        productDescription: e.target.value,
                      })
                    }
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
                        onChange={(e) =>
                          setProductInputVals({
                            ...productInputVals,
                            price: {
                              small: e.target.value,
                              medium: productInputVals?.price?.medium,
                              large: productInputVals?.price?.large,
                            },
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup
                        type="single"
                        defaultValue="s"
                        variant="outline"
                      >
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
                        onChange={(e) =>
                          setProductInputVals({
                            ...productInputVals,
                            price: {
                              small: productInputVals?.price?.small,
                              medium: e.target.value,
                              large: productInputVals?.price?.large,
                            },
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup
                        type="single"
                        defaultValue="m"
                        variant="outline"
                      >
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
                        onChange={(e) =>
                          setProductInputVals({
                            ...productInputVals,
                            price: {
                              small: productInputVals?.price?.small,
                              medium: productInputVals?.price?.medium,
                              large: e.target.value,
                            },
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup
                        type="single"
                        defaultValue="l"
                        variant="outline"
                      >
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
                onChange={imageChangeHandler}
                type="file"
              ></Input>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between">
                {uploadedImages?.map((imageUrl: string, index: number) => {
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
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
              <CardTitle>Archive Product</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div></div>
              <Button size="sm" variant="secondary">
                Archive Product
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Product Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="grid gap-1">
                  <Label htmlFor="category"></Label>
                  <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCategory.map((category: any, index: any) => {
                        return (
                          <SelectItem key={index} value={category}>
                            {category?.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-07-chunk-3">
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status" aria-label="Select status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
