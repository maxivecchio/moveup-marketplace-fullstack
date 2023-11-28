import { useState, useEffect } from "react";
import axios from "axios";

function useProductBySlug(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios
      .get(`http://localhost:3022/api/products/slug/${slug}`)
      .then((response) => setProduct(response.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [slug]);

  return { product, loading, error };
}

export default useProductBySlug;
