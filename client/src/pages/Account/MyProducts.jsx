import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProductCard from "../../components/ProductCard";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Spinner,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userProfile, token } = useAuth();
  const [refetch, setRefetch] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3022/api/products/user/${userProfile._id}`
      );
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3022/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setRefetch(true);
      enqueueSnackbar({
        message: "Product Deleted Successfully",
        variant: "warning",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      fetchProducts();
      setRefetch(false);
    }
  }, [userProfile, refetch]);

  return !loading && userProfile ? (
    <>
      <NewProduct setRefetch={setRefetch} />
      {products.length === 0 && <p>No products found</p>}
      {products.length > 0 && (
        <div className="mt-4 grid gap-4 min-h-screen lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col">
              <ProductCard key={index} product={product} />
              <div className="mt-4 flex justify-center gap-4">
                <EditProduct product={product} setRefetch={setRefetch} />
                <DeleteProduct
                  product={product}
                  handleDelete={handleDelete}
                  setRefetch={setRefetch}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  ) : (
    <div className="w-full flex justify-center mt-24">
      <Spinner />
    </div>
  );
};

export default MyProducts;
