import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useProductBySlug from "../hooks/useProductBySlug";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ProductCard = ({ product, variant = "shop" }) => {
  function numberWithDot(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
    return x;
  }


  const MobileBtn = () => {
    return (
      <>
        <span className="hidden sm:block">Añadir al Carrito</span>
        <RiShoppingCartLine className="mx-auto sm:hidden" />
      </>
    );
  };

  const ProductPrice = ({ className }) => {
    return (
      <div
        className={`flex justify-between items-center flex-col ${
          className || ""
        }`}
      >
        <p className="text-lg font-semibold">${numberWithDot(product.price)}</p>
      </div>
    );
  };

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

  return (
    <div
      className={`flex flex-col justify-between mx-auto sm:max-w-xs bg-background dark:bg-background shadow-lg border-2 rounded-lg ${
        variant === "home" ? "p-5" : "p-2 pb-4 sm:p-5"
      }`}
    >
      <Link to={`/marketplace/product/${product.slug}`}>
        <div>
          <div
            className={`flex justify-center ${
              variant === "home" ? "mb-4" : "mb-2 sm:mb-4"
            }`}
          >
            <img
              src={product.imageUrl || 'https://via.placeholder.com/1080x1080/eee?text=1:1'}
              alt={`Product "${product.name}" Image`}
              className="aspect-square w-full object-cover rounded-lg dark:brightness-90"
            />
          </div>
          <div>
            <p
              className={`text-gray-600 dark:text-white text-center ${
                variant === "home" ? "text-xl" : "text-md sm:text-lg md:text-xl"
              }`}
            >
              {product.name}
            </p>
            <ProductPrice className="hidden sm:flex" />
          </div>
          <ProductPrice className="sm:hidden" />
        </div>
      </Link>
      <div className="flex">
        <button
        onClick={handleAgregarAlCarrito}
          className={`bg-primary dark:hover:bg-primary-dark text-white ${
            variant === "home"
              ? "w-full max-w-xs mt-4"
              : "mx-auto w-4/5 sm:w-full sm:max-w-xs mt-2 sm:mt-4"
          } rounded p-2`}
        >
          {variant === "home" ? "Añadir al carrito" : <MobileBtn />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
