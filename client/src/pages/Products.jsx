import { Input } from "@nextui-org/react";
import { GoSearch } from "react-icons/go";
import ProductCard from "../components/ProductCard";
import { Progress } from "@nextui-org/react";

import { useProducts } from "../context/ProductContext";

const Home = () => {
  const { products, productsLoading } = useProducts();
  return (
    <>
      <div>
        <div className="h-32 sm:h-64 md:h-80 bg-gradient-to-r from-[#b0d5ff] to-[#b0e2ff] flex px-4 pt-8 md:px-16 md:py-0 text-muted flex-col md:justify-center gap-y-2">
          <div className="flex flex-col">
            <p>Home / Marketplace</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase">
              Marketplace
            </h2>
          </div>
        </div>
        {productsLoading ? (
          <div>
            <Progress
              size="sm"
              isIndeterminate
              aria-label="Loading Products"
              className="w-full"
            />
          </div>
        ) : (
          <div className="min-h-screen ">
            <div className="w-full mt-4 md:mt-8 px-4 md:px-8 lg:px-16 xl:px-32 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {products?.map((product, index) => (
                <ProductCard key={index} variant="home" product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
