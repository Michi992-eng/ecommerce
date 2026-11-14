'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      let response;
      if (searchValue === '') {
        response = await fetch("https://dummyjson.com/products");
      } else {
        response = await fetch(`https://dummyjson.com/products/search?q=${searchValue}`);
      }
      const data = await response.json();
      setProducts(data.products);
      setIsLoading(false);
    };
    fetchProducts();
  }, [searchValue]);

  const handleRedirect = (productId) => {
    router.push(`/product/${productId}`);
  };

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-center text-4xl font-bold tracking-tight text-rose-400">
        PRODUCTS
      </h1>

      <div className="mt-6 flex justify-center">
        <Input
          placeholder="Search products..."
          value={searchValue}
          onChange={handleSearchInput}
          className="h-11 w-full max-w-md"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
            <div className="h-4 w-4 rounded-full border-2 border-rose-400 border-t-transparent animate-spin"></div>
            Loading products...
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="py-24 text-center text-slate-500">
          No products found for "{searchValue}"
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex h-full flex-col overflow-hidden pt-0 transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="flex aspect-square items-center justify-center bg-slate-50 p-6">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-1 text-base">
                  {product.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1">
                <CardDescription className="line-clamp-3">
                  {product.description}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleRedirect(product.id)}
                  className="h-9 w-full cursor-pointer"
                >
                  View product
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}