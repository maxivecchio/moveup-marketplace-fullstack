import ProductCard from "../components/ProductCard";
import {
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

const MerchantView = () => {
  const { merchantUsername } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(true);

  axios
    .get(`http://localhost:3022/api/products/userhandle/${merchantUsername}`)
    .then((res) => {
      setProducts(res.data.products);
      setMerchant(res.data.user);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      navigate("/marketplace");
    });

  return (
    <>
      <div className="min-h-screen">
        <div className="min-h-32 md:h-80 bg-gradient-to-r from-[#b0d5ff] to-[#b0e2ff] flex px-4 pt-8 md:px-16 md:py-0 text-muted flex-col md:justify-center gap-y-2">
          <div className="flex flex-col">
            <div className="mt-6 py-4 md:py-0 grid gap-y-4 md:grid-cols-2">
              <div>
                <p>Home / Marketplace / Merchant</p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase">
                  {merchant?.displayname}
                </h2>
              </div>
              <div>
                <div>
                  <h3 className="text-center font-bold">About Merchant</h3>
                </div>
                <Table
                  className="mt-1 max-w-xl mx-auto"
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
            </div>
          </div>
        </div>
        {loading ? (
          <div>
            <Progress
              size="sm"
              isIndeterminate
              aria-label="Loading Products"
              className="w-full"
            />
          </div>
        ) : (
          <div className="min-h-screen">
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

export default MerchantView;
