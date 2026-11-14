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
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
          <div className="h-4 w-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
          Loading product details...
        </div>
      </div>
    );
  }

  if (!productId) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-red-600 shadow-sm">
          <p className="font-semibold">Product not found.</p>
        </div>
      </div>
    );
  }

  const handleRedirect = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="grid grid-cols-1 gap-10 p-6 md:grid-cols-2 md:p-10">
          <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-64 w-64 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            {product.category && (
              <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                {product.category}
              </span>
            )}

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
              {product.title}
            </h1>

            <div className="flex items-center gap-3">
              {typeof product.price === "number" && (
                <span className="text-2xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
              {typeof product.rating === "number" && (
                <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-medium text-amber-600">
                  ★ {product.rating.toFixed(1)}
                </span>
              )}
            </div>

            <p className="text-base leading-relaxed text-slate-600">
              {product.description}
            </p>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50/60 p-6 md:p-8">
            <h2 className="mb-5 text-xl font-bold tracking-tight text-slate-800">
              Related Products
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  onClick={() => handleRedirect(related.id)}
                  className="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={related.thumbnail}
                      alt={related.title}
                      className="h-14 w-14 object-cover transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                      {related.title}
                    </p>
                    {typeof related.price === "number" && (
                      <p className="text-sm text-slate-500">
                        ${related.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
