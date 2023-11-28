import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3022/api/products")
      .then((res) => {
        setProducts(res.data);
        setProductsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  /*
  useEffect(() => {
    setProducts([
      {
        _id: "6554e58e01500a744c1a9ed4",
        name: "Buzo Brand Lime",
        slug: "buzo-brand-lime",
        price: 63990,
        category: "65541f992f46ba7169017cc7",
        stock: 100,
        imageUrl:
          "https://acdn.mitiendanube.com/stores/219/431/products/eebb4212-fde7-4657-8407-3eace0e46294-1ef36b6a74628f23a916993755280277-480-0.webp",
        __v: 0,
        imgs: [],
      },
      {
        _id: "6554e5af01500a744c1a9ed7",
        name: "Remeron Verified White",
        slug: "remeron-verified-white",
        price: 32990,
        category: "65541fa32f46ba7169017cc9",
        stock: 0,
        imageUrl:
          "https://acdn.mitiendanube.com/stores/219/431/products/dbb1ec55-005b-4240-8f67-78fc5de7b01a-82ee3f989a00ccc3d516994795871612-480-0.webp",
        __v: 0,
        imgs: [],
      },
      {
        _id: "6554e5bf01500a744c1a9ed9",
        name: "Camisa Monogram",
        slug: "camisa-monogram-lime",
        price: 40990,
        category: "65541fae2f46ba7169017ccb",
        stock: 0,
        imageUrl:
          "https://acdn.mitiendanube.com/stores/219/431/products/92a2854f-359e-4e55-8903-67a52a19b8ed-b89d4c040843bdee5616990214194944-480-0.webp",
        __v: 0,
        imgs: [],
      },
      {
        _id: "6554e5d201500a744c1a9edb",
        name: "Remeron Gorillaz",
        slug: "remeron-gorillaz",
        price: 33990,
        category: "65541fa32f46ba7169017cc9",
        stock: 0,
        imageUrl:
          "https://acdn.mitiendanube.com/stores/219/431/products/4562c9c8-0204-4421-877c-23a45af2af69-71fb02845e14181b9f16990212918984-480-0.webp",
        __v: 0,
        imgs: [],
      },
      {
        _id: "6554e5e201500a744c1a9edd",
        name: "Remeron MNKY Need Love",
        slug: "remeron-mNKY-need-love",
        price: 33990,
        category: "65541fa32f46ba7169017cc9",
        stock: 0,
        imageUrl:
          "https://acdn.mitiendanube.com/stores/219/431/products/62d69aad-c023-44ec-8bed-da6cc1e8e6a0-8c7f16b779ec9ea64516993754833613-480-0.webp",
        __v: 0,
        imgs: [],
      },
    ]);
    setProductsLoading(false)
  }, []);
  */

  const contextValue = {
    products,
    productsLoading,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw Error("useProducts must be used within an ProductProvider");
  }
  return context;
};

export { ProductProvider, useProducts };
