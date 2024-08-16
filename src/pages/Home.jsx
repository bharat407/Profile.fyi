import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function fetchProductsData() {
    setLoading(true);
    try {
      const output = await fetch(API_URL);
      const data = await output.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto mb-10">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">No Products Found</div>
      )}
    </div>
  );
};

export default Home;
