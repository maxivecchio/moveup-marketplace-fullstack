import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Input } from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";

function formatNumberToUSStyle(number) {
  if (number) {
    const hasDecimals = number % 1 !== 0;
    return number.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    });
  }
}

const Cart = () => {
  const { userProfile } = useAuth();
  const [cart, setCart] = useState(null);

  const calculateSubTotal = () => {
    if (cart) {
      let total = 0;
      cart.products.forEach((product) => {
        let productTotal = product.quantity * product.productDetails.price;
        total += productTotal;
      });
      return total;
    }
  };

  const fetchCart = async () => {
    try {
      const usuarioId = userProfile._id;

      const response = await axios.get(
        `http://localhost:3022/api/cart/${usuarioId}`
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error obteniendo el carrito:", error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      console.log(productId);
      const response = await axios.delete(
        `http://localhost:3022/api/cart/${userProfile._id}/${productId}`
      );
      enqueueSnackbar({
        message: "Product removed from cart",
        variant: "success",
      });
      fetchCart();
    } catch (error) {
      console.error("Error obteniendo el carrito:", error.message);
    }
  };
  useEffect(() => {
    if (userProfile) {
      fetchCart();
    }
  }, [userProfile]);
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto pt-24 max-w-2xl px-4 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <Link to="/marketplace">Back to Marketplace</Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shopping Cart
        </h1>
        {cart && cart.totalAmount > 0 ? (
          <>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul
                  role="list"
                  className="divide-y divide-foreground/20 border-b border-foreground/20"
                >
                  {cart.products.map((product, productIdx) => (
                    <li key={productIdx} className={`flex py-6 sm:py-10`}>
                      <div className="flex-shrink-0">
                        <img
                          src={
                            "https://via.placeholder.com/1080x1080/eee?text=1:1"
                          }
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex flex-col justify-between">
                              <h3 className="text-sm">
                                {product.productDetails.name}
                              </h3>
                            </div>
                            {/* <div className="mt-1 flex text-sm">
                                    <p className="text-foreground/50">{product.color}</p>
                                    {product.size ? (
                                      <p className="ml-4 border-l border-gray-200 pl-4 text-foreground/50">{product.size}</p>
                                    ) : null}
                                  </div> */}
                            <p className="mt-1 text-sm font-medium text-foreground/90">
                              Price per unit: $
                              {formatNumberToUSStyle(
                                product.productDetails.price
                              )}
                            </p>
                            <p className="mt-1 text-sm font-medium text-foreground/90">
                              Quantity: {product.quantity}
                            </p>
                            <Button
                              variant="ghost"
                              color="danger"
                              className="mt-2 p-0"
                              onClick={() => {
                                removeFromCart(product.productDetails._id);
                              }}
                            >
                              Remove
                            </Button>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label
                              htmlFor={`quantity-${productIdx}`}
                              className="sr-only"
                            >
                              Quantity, {product.productDetails.name}
                            </label>
                          </div>
                        </div>
                        <p className="mt-4 flex space-x-2 text-sm text-foreground/70">
                          {product.productDetails.stock > 0 ? (
                            <CiCircleCheck
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <FaRegCircleXmark
                              className="h-5 w-5 flex-shrink-0 text-red-300"
                              aria-hidden="true"
                            />
                          )}
                          <span>
                            {product.productDetails.stock > 0
                              ? "In stock"
                              : `Out Of Stock`}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <div className="lg:col-span-5 flex flex-col lg:gap-y-8">
                <section
                  aria-labelledby="summary-heading"
                  className="mt-16 w-full rounded-lg bg-gray-50 dark:bg-background border-1 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8"
                >
                  <h2
                    id="summary-heading"
                    className="text-lg font-medium text-foreground/90"
                  >
                    Order summary
                  </h2>

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-foreground/70">Subtotal</dt>
                      <dd className="text-sm font-medium text-foreground/90">
                        ${formatNumberToUSStyle(calculateSubTotal())}
                      </dd>
                    </div>
                    {/* <div className="flex items-center justify-between border-t border-foreground/20 pt-4">
                          <dt className="flex items-center text-sm text-foreground/60">
                            <span>Shipping estimate</span>
                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Learn more about how shipping is calculated</span>
                              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                          </dt>
                          <dd className="text-sm font-medium text-foreground/90">$5.00</dd>
                        </div> */}
                    {/* <div className="flex items-center justify-between border-t border-foreground/20 pt-4">
                          <dt className="flex text-sm text-foreground/60">
                            <span>Tax estimate</span>
                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Learn more about how tax is calculated</span>
                              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                          </dt>
                          <dd className="text-sm font-medium text-foreground/90">$8.32</dd>
                        </div> */}
                    <div className="flex items-center justify-between border-t border-foreground/20 pt-4">
                      <dt className="text-base font-medium text-foreground/80">
                        Order total
                      </dt>
                      <dd className="text-base font-medium text-foreground/80">
                        ${formatNumberToUSStyle(calculateSubTotal())}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-background shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Checkout
                    </button>
                  </div>
                </section>
                <section
                  aria-labelledby="summary-heading"
                  className={`mt-16 rounded-lg bg-gray-50 dark:bg-background border-1 border px-4 py-6 sm:p-6 lg:mt-0 lg:p-8`}
                >
                  <h2
                    id="summary-heading"
                    className="text-lg font-medium text-foreground/90"
                  >
                    Discount Code
                  </h2>

                  <dl className="mt-2 flex-gap-x-4 flex flex-row">
                    <Input></Input>
                    <Button type="button" className="ml-2">
                      Aplicar
                    </Button>
                  </dl>
                </section>
                <section
                  aria-labelledby="summary-heading"
                  className="mt-16 rounded-lg bg-gray-50 dark:bg-background border-1 border px-4 py-6 sm:p-6 lg:mt-0 lg:p-8"
                >
                  <h2
                    id="summary-heading"
                    className="text-lg font-medium text-foreground/90"
                  >
                    Gift Card
                  </h2>

                  <dl className="mt-2 flex-gap-x-4 flex flex-row">
                    <Input></Input>
                    <Button type="button" className="ml-2">
                      Aplicar
                    </Button>
                  </dl>
                </section>
              </div>
            </form>
          </>
        ) : (
          <div className="mt-4">
            <h2 className="mb-2 text-lg">
              You don't have any products in your cart.
            </h2>
            <Link to="/marketplace">
              <Button>Explore Marketplace</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
