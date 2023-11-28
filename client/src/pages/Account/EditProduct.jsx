import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useAuth } from "../../context/AuthContext";

export default function EditProduct({ product, setRefetch }) {
  const { userProfile, token } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productData, setProductData] = useState({
    user_id: product.user_id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    stock: product.stock,
  });

  useEffect(() => {
    if (userProfile) {
      setProductData({ ...productData, user_id: userProfile._id });
    }
  }, []);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3022/api/products/${product._id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onOpenChange(false);
      setRefetch(true);
    } catch (error) {
      console.error("Error uploading product:", error.message);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="secondary">
        Edit Product
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editing: {product.name}
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Name"
                  variant="bordered"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Slug"
                  variant="bordered"
                  name="slug"
                  value={productData.slug}
                  onChange={handleChange}
                />
                <Textarea
                  isRequired
                  label="Description"
                  variant="bordered"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  type="number"
                  label="Price"
                  variant="bordered"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  label="Stock"
                  variant="bordered"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
