
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
    <div className="min-h-screen bg-[#faf8f7] text-[#292524]">

      {/* HEADER */}
      <header className="border-b border-rose-100/70 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-extrabold tracking-tight">
            shop<span className="text-rose-400">.</span>
          </h1>

          <div className="hidden items-center gap-8 text-sm font-medium text-stone-500 sm:flex">
            <a href="#" className="text-rose-400">Home</a>
            <a href="#products" className="transition hover:text-rose-400">
              Products
            </a>
          </div>

          <span className="rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-500">
            Discover something new
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] bg-[#f5e7e5] px-7 py-16 sm:px-12 md:py-24">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-6 inline-block rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
              A little something for you
            </p>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Find your next
              <br />
              <span className="text-rose-400">favorite thing.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              Explore our collection and discover products
              that make everyday moments a little more special.
            </p>

            <a
              href="#products"
              className="mt-8 inline-flex rounded-full bg-[#292524] px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-rose-400"
            >
              Explore collection →
            </a>
          </div>

          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-40 h-80 w-80 rounded-full bg-white/70 blur-3xl" />
        </section>

        {/* PRODUCTS */}
        <section id="products" className="pt-20">

          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-rose-400">
                Carefully selected
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Explore products
              </h2>

              <p className="mt-3 text-sm text-stone-500">
                Find something you'll absolutely love.
              </p>
            </div>

            <div className="w-full md:max-w-sm">
              <Input
                placeholder="Search products..."
                value={searchValue}
                onChange={handleSearchInput}
                className="h-12 rounded-full border-stone-200 bg-white px-5 text-sm shadow-sm transition focus-visible:ring-rose-300"
              />
            </div>
          </div>

          <div className="mb-7 flex items-center justify-between border-b border-stone-200 pb-4">
            <p className="text-sm font-medium text-stone-500">
              {isLoading ? "Loading collection..." : `${products.length} products`}
            </p>

            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Our collection
            </span>
          </div>

          {/* LOADING */}
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-medium text-stone-500 shadow-sm ring-1 ring-stone-100">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-400 border-t-transparent"></div>
                Loading products...
              </div>
            </div>

          ) : products.length === 0 ? (

            <div className="rounded-3xl bg-white py-24 text-center shadow-sm">
              <p className="text-xl font-bold text-stone-800">
                No products found
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Try searching for "{searchValue}" with another keyword.
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white pt-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-rose-100/50"
                >

                  <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#f5f3f0] p-7">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />

                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                      {product.category}
                    </span>
                  </div>

                  <CardHeader className="space-y-2 px-5 pb-2 pt-5">
                    <CardTitle className="line-clamp-1 text-base font-bold text-stone-800 transition-colors group-hover:text-rose-400">
                      {product.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 px-5">
                    <CardDescription className="line-clamp-3 text-sm leading-6 text-stone-500">
                      {product.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="px-5 pb-5 pt-3">
                    <Button
                      onClick={() => handleRedirect(product.id)}
                      className="h-11 w-full cursor-pointer rounded-full bg-[#292524] text-sm font-semibold text-white transition-all duration-300 hover:bg-rose-400"
                    >
                      View product →
                    </Button>
                  </CardFooter>

                </Card>
              ))}
            </div>
          )}

        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-9 sm:flex-row">
          <h2 className="text-xl font-extrabold tracking-tight">
            shop<span className="text-rose-400">.</span>
          </h2>

          <p className="text-xs text-stone-400">
            © 2026 shop. All rights reserved.
          </p>

          <p className="text-xs text-stone-400">
            Made with care ♡
          </p>
        </div>
      </footer>

    </div>
  );
}
