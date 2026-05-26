import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { ProductCard } from "../components/ProductCard";
import Hero from "../components/home/Hero";
import AdsBanner from "../components/ads/AdsBanner";
import ProductFilter from "../components/home/ProductFilter";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: categoriesData } = useCategories();

  const filterCategories = [
    { value: "", label: "All Products" },
    ...(categoriesData?.map((c) => ({ value: c.name, label: c.name })) || []),
  ];

  const params = {};
  if (debouncedSearch) params.name_like = debouncedSearch;
  if (category) params.category = category;

  const { data: products, isLoading, error } = useProducts(params);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Hero />

      <section className="py-24 px-6 relative z-20 bg-slate-50 dark:bg-slate-950 -mt-20 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto space-y-12">
          <AdsBanner />

          <ProductFilter
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={filterCategories}
          />

          <div className="pt-8 w-full max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-500 dark:border-t-indigo-400 rounded-full animate-spin" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Loading products...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-32">
                <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">
                  Error loading products
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Please make sure json-server is running on port 3000.
                </p>
              </div>
            ) : !products?.length ? (
              <div className="text-center py-32">
                <h3 className="text-2xl font-bold text-foreground dark:text-white mb-3">
                  No products found
                </h3>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                  }}
                  className="mt-8 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                key={`${debouncedSearch}-${category}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in"
              >
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
