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
import { enqueueSnackbar } from "notistack";

export default function NewProduct({ setRefetch }) {
  const { userProfile, token } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productData, setProductData] = useState({
    user_id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
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
      const response = await axios.post(
        "http://localhost:3022/api/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar({
        message: "Product Uploaded Successfully",
        variant: "success",
      });
      onOpenChange(false);
      setRefetch(true);
      setProductData({
        user_id: userProfile._id,
        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error uploading product:", error.message);
    }
  };

  return (
    <>
      <Button onPress={onOpen} variant="flat">
        Upload Product
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Product
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
