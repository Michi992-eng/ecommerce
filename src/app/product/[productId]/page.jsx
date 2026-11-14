
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.productId;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);

      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await res.json();
      setProduct(data);
      setIsLoading(false);
    };

    if (productId) {
      fetchProduct();
    }
  }, []);

  useEffect(() => {
    if (product === null) return;
    const fetchRelated = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${product.category}`,
      );
      const data = await response.json();

      setRelatedProducts(
        data.products
          .filter((product) => Number(product.id) !== Number(productId))
          .slice(0, 5),
      );
    };
    fetchRelated();
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#faf8f7] p-6">
        <div className="flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-medium text-stone-500 shadow-sm ring-1 ring-stone-100">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-400 border-t-transparent"></div>
          Loading product details...
        </div>
      </div>
    );
  }

  if (!productId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#faf8f7] p-6">
        <div className="w-full max-w-md rounded-3xl border border-rose-100 bg-white p-10 text-center shadow-sm">
          <p className="text-xl font-bold text-stone-800">
            Product not found.
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Sorry, we couldn't find this product.
          </p>
        </div>
      </div>
    );
  }

  const handleRedirect = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-[#faf8f7] text-[#292524]">

      {/* NAVIGATION */}
      <header className="border-b border-rose-100/70 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1
            onClick={() => router.push("/")}
            className="cursor-pointer text-2xl font-extrabold tracking-tight"
          >
            shop<span className="text-rose-400">.</span>
          </h1>

          <div className="flex items-center gap-6 text-sm font-medium text-stone-500">
            <a href="/" className="transition hover:text-rose-400">
              Home
            </a>
            <a href="/#products" className="text-rose-400">
              Products
            </a>
          </div>

          <span className="hidden rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-500 sm:block">
            Discover something new
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {/* BREADCRUMB */}
        <div className="mb-8 flex items-center gap-2 text-sm text-stone-400">
          <a href="/" className="transition hover:text-rose-400">
            Home
          </a>
          <span>/</span>
          <a href="/#products" className="transition hover:text-rose-400">
            Products
          </a>
          <span>/</span>
          <span className="max-w-[150px] truncate font-medium text-stone-700">
            {product.title}
          </span>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="overflow-hidden rounded-[2rem] border border-stone-100 bg-white shadow-sm">

          <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 md:grid-cols-2 md:gap-14 md:p-14">

            {/* PRODUCT IMAGE */}
            <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#f5f3f0] p-8 sm:min-h-[450px]">

              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-200/30 blur-3xl" />

              <img
                src={product.thumbnail}
                alt={product.title}
                className="relative z-10 h-full max-h-[400px] w-full object-contain drop-shadow-sm transition-transform duration-500 hover:scale-110"
              />

              {product.discountPercentage > 0 && (
                <span className="absolute left-5 top-5 z-20 rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white">
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              )}

            </div>

            {/* PRODUCT INFORMATION */}
            <div className="flex flex-col justify-center py-4">

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-rose-400">
                Carefully selected for you
              </p>

              {product.category && (
                <span className="mb-5 w-fit rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-rose-500">
                  {product.category}
                </span>
              )}

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                {product.title}
              </h1>

              {/* PRICE AND RATING */}
              <div className="mt-7 flex flex-wrap items-center gap-4">

                {typeof product.price === "number" && (
                  <span className="text-3xl font-extrabold tracking-tight text-stone-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}

                {typeof product.rating === "number" && (
                  <span className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-600">
                    ★ {product.rating.toFixed(1)}
                  </span>
                )}

              </div>

              <div className="my-8 h-px bg-stone-100" />

              {/* DESCRIPTION */}
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-stone-800">
                  Product description
                </h2>

                <p className="text-base leading-8 text-stone-500">
                  {product.description}
                </p>
              </div>

              {/* DECORATIVE DETAILS */}
              <div className="mt-9 rounded-2xl bg-[#faf8f7] p-5">
                <p className="text-sm font-semibold text-stone-800">
                  A little something special ♡
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Explore more products from our carefully selected collection.
                </p>
              </div>

            </div>
          </div>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-stone-100 bg-[#faf8f7] px-6 py-12 sm:px-10 md:px-14">

              <div className="mb-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-rose-400">
                  You might also like
                </p>

                <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                  Related products
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                  More things you might fall in love with.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {relatedProducts.map((related) => (
                  <div
                    key={related.id}
                    onClick={() => handleRedirect(related.id)}
                    className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/40"
                  >

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f5f3f0] p-2">

                      <img
                        src={related.thumbnail}
                        alt={related.title}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-bold text-stone-800 transition-colors group-hover:text-rose-400">
                        {related.title}
                      </p>

                      {typeof related.price === "number" && (
                        <p className="mt-2 text-sm font-semibold text-stone-500">
                          ${related.price.toFixed(2)}
                        </p>
                      )}

                      <p className="mt-2 text-xs font-medium text-rose-400">
                        View product →
                      </p>

                    </div>

                  </div>
                ))}

              </div>
            </div>
          )}

        </div>
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
};

export default Page;
