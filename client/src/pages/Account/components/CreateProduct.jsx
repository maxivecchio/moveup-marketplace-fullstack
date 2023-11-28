import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/utils/InputField";
import SelectField from "../components/utils/SelectField";
import FileInput from "../components/utils/FileInput";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

const Agregar = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    titulo: "",
    descripcion: [
      {
        key: "",
        value: "",
      },
    ],
    precio: 0,
    categoriaId: [],
    img: [],
    detalles: "",
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get("https://ecomerce-aplicaciones-hibridas-server-5t06rtaok.vercel.app/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (e, index, field) => {
    const nuevosDetalles = [...producto.descripcion];
    nuevosDetalles[index][field] = e.target.value;
    setProducto((prevProducto) => ({
      ...prevProducto,
      descripcion: nuevosDetalles,
    }));
  };

  const addDescription = () => {
    setProducto((prevProducto) => ({
      ...prevProducto,
      descripcion: [...prevProducto.descripcion, { key: "", value: "" }],
    }));
  };

  const removeDescription = (index) => {
    const updatedDescripciones = [...producto.descripcion];
    updatedDescripciones.splice(index, 1);
    setProducto((prevProducto) => ({
      ...prevProducto,
      descripcion: updatedDescripciones,
    }));
  };

  const handleSelectChange = (selectedKeys) => {
    setProducto((prevProducto) => ({
      ...prevProducto,
      categoriaId: selectedKeys,
    }));
  };

  const handleFileChange = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("img", files[i]);
    }
    setProducto((prevProducto) => ({
      ...prevProducto,
      img: Array.from(files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("titulo", producto.titulo);
      formData.append("precio", producto.precio);
      formData.append("detalles", producto.detalles);
      formData.append("descripcion", JSON.stringify(producto.descripcion));
      const categoriaIdsArray = Array.from(producto.categoriaId);
      formData.append("categoriaId", categoriaIdsArray);

      producto.img.forEach((imgs, index) => {
        formData.append(`img`, imgs);
      });

      await axios.post("https://ecomerce-aplicaciones-hibridas-server-5t06rtaok.vercel.app/productos", formData);

      setProducto({
        titulo: "",
        descripcion: [
          {
            key: "",
            value: "",
          },
        ],
        precio: 0,
        categoriaId: [],
        img: [],
        detalles: "",
      });

      setSuccessMessage("Se ha creado el producto exitosamente");
      navigate("/panel");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      setErrorMessage(
        "Error al agregar el producto. Por favor, inténtalo de nuevo."
      );

      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
        console.error("Código de estado:", error.response.status);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor");
      } else {
        console.error(
          "Error en la configuración de la solicitud:",
          error.message
        );
      }
    }
  };

  return (
    <>
      <div>
        {successMessage && (
          <Message
            type="success"
            message={successMessage}
            onClose={closeNotification}
          />
        )}
        {errorMessage && (
          <Message
            type="error"
            message={errorMessage}
            onClose={closeNotification}
          />
        )}
      </div>
      <div className="bg-white mt-20">
        <h2 className="text-center text-5xl">Agregar un producto</h2>
        <div className="pt-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 items-center">
              <div className="hidden lg:block aspect-h-4 aspect-w-10 overflow-hidden rounded-lg">
                <FileInput onFileNameChange={handleFileChange} />
              </div>

              <div className="lg:col-span-1 lg:border-l lg:border-gray-400 lg:pl-8">
                <InputField
                  label="Título"
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={producto.titulo}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Precio"
                  type="number"
                  id="precio"
                  name="precio"
                  value={producto.precio}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripcion
                  </label>
                  <textarea
                    name="detalles"
                    id="detalles"
                    rows="4"
                    className="mt-1 p-2 border rounded-md w-full resize-none"
                    value={producto.detalles}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <SelectField
                  label="Categorías"
                  selectedKeys={producto.categoriaId}
                  onSelectionChange={handleSelectChange}
                  options={categorias}
                />

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover-bg-orange-700 focus:outline-none focus-ring-2 focus-ring-orange-500 focus-ring-offset-2"
                >
                  Agregar
                </button>
              </div>
            </div>

            <section className="flex flex-col justify-center items-center">
              <div className="w-5/6 lg:col-span-1 border-t-1 border-gray-500 p-5">
                <div className="flex">
                  <h2 className="text-xl font-medium text-gray-900">
                    Detalles:
                  </h2>
                  <button
                    type="button"
                    onClick={addDescription}
                    className="mx-10 text-sm text-green-600 underline cursor-pointer"
                  >
                    <AiOutlinePlusCircle className="text-2xl" />
                  </button>
                </div>
                {producto.descripcion.map((descripcion, index) => (
                  <div key={index} className="ml-10 mt-5 flex">
                    <div className="mx-10">
                      <label className="block text-sm font-medium text-gray-700">
                        Titulo del detalle
                      </label>
                      <input
                        type="text"
                        name={`descripcionKey-${index}`}
                        className="p-2 border rounded-md"
                        value={descripcion.key}
                        onChange={(e) =>
                          handleDescriptionChange(e, index, "key")
                        }
                      />
                    </div>
                    <div className="mx-10">
                      <label className="block text-sm font-medium text-gray-700">
                        Contenido del detalle
                      </label>
                      <input
                        type="text"
                        name={`descripcionValue-${index}`}
                        className="p-2 border rounded-md w-96"
                        value={descripcion.value}
                        onChange={(e) =>
                          handleDescriptionChange(e, index, "value")
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDescription(index)}
                      className="mt-2 text-sm text-red-600 underline cursor-pointer"
                    >
                      <BiTrashAlt className="text-2xl" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default Agregar;
