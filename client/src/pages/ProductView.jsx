import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProductBySlug from "../hooks/useProductBySlug";
import { FaArrowLeft } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "@nextui-org/react";

import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import axios from "axios";

const ProductView = () => {
  const { productHandle } = useParams();
  const { product, loading, error } = useProductBySlug(productHandle);
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState(null);
  const { userProfile } = useAuth();

  const handleAgregarAlCarrito = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3022/api/cart/${userProfile._id}`,
        {
          userId: userProfile._id,
          productId: product._id,
          quantity: 1,
        }
      );

      console.log("Producto agregado al carrito:", response.data);
    } catch (error) {
      console.error("Error al agregar al carrito:", error.message);
    }
  };

  useEffect(() => {
    if (product) {
      axios
        .get(`http://localhost:3022/api/users/${product.user_id}`)
        .then((res) => {
          setMerchant(res.data);
        });
    }
    if (error) {
      navigate("/marketplace");
    }
  }, [product, error]);

  return (
    <div>
      {!loading && product && (
        <div>
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            {/* Image gallery */}
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              <div className="mt-6 flex items-center mb-2">
                <FaArrowLeft className="text-primary" />{" "}
                <span className="ml-1 text-primary">Go Back</span>
              </div>
            </button>

            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Product Images */}
              <div>
                {/* {product.images &&
                  ))}
                  product.images.map((image) => (
                  */}
                <img
                  src={"https://via.placeholder.com/1080x1080/eee?text=1:1"}
                  alt={product.name}
                  className="h-full w-full object-cover object-center sm:rounded-lg"
                />
                <div className="mt-4 flex flex-wrap mx-auto justify-start gap-4">
                  <img
                    src={"https://via.placeholder.com/1080x1080/eee?text=1:1"}
                    alt={product.name}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  />
                  <img
                    src={"https://via.placeholder.com/1080x1080/eee?text=1:1"}
                    alt={product.name}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  />
                  <img
                    src={"https://via.placeholder.com/1080x1080/eee?text=1:1"}
                    alt={product.name}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  />
                  <img
                    src={"https://via.placeholder.com/1080x1080/eee?text=1:1"}
                    alt={product.name}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  />
                </div>
              </div>

              <div className="pt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight">
                  {product.name}
                </h1>

                <div className="mt-3">
                  <p className="text-3xl tracking-tight">${product.price}</p>
                </div>

                <div className="mt-6">
                  <p className="space-y-6 text-base text-foreground/90">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6">
                  <h3>About Merchant</h3>
                  <Table
                    className="mt-1"
                    aria-label="Example static collection table"
                  >
                    <TableHeader>
                      <TableColumn>Name</TableColumn>
                      <TableColumn>Username</TableColumn>
                      <TableColumn>Address</TableColumn>
                      <TableColumn>Contact</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>{merchant?.displayname}</TableCell>
                        <TableCell
                          onClick={() =>
                            navigate(`/marketplace/${merchant?.username}`)
                          }
                        >
                          {merchant?.username}
                        </TableCell>
                        <TableCell>{merchant?.businessAddress}</TableCell>
                        <TableCell>{merchant?.businessContact}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 gap-4 flex ">
                  <Button
                    onClick={handleAgregarAlCarrito}
                    variant="solid"
                    color="primary"
                  >
                    Add to Cart
                  </Button>
                  <Link to={`/marketplace/${merchant?.username}`}>
                    <Button variant="faded" color="primary">
                      View Merchant Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="w-full flex justify-center mt-24">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ProductView;
