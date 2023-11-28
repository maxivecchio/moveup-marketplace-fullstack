import React, { useState } from "react";
import axios from "axios";

const BusinessProfileForm = ({ userProfile, token, fetchUserProfile }) => {
  const [formData, setFormData] = useState({
    displayname: "",
    username: "",
    businessContact: "",
    businessAddress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:3022/api/users/${userProfile._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Perfil actualizado:", response.data);
      fetchUserProfile(userProfile._id);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-lg mx-auto mt-6 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          htmlFor="displayname"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Display Name
        </label>
        <input
          type="text"
          id="displayname"
          name="displayname"
          value={formData.displayname}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="businessContact"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Business Contact
        </label>
        <input
          type="text"
          id="businessContact"
          name="businessContact"
          value={formData.businessContact}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="businessAddress"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Business Address
        </label>
        <input
          type="text"
          id="businessAddress"
          name="businessAddress"
          value={formData.businessAddress}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Profile
      </button>
    </form>
  );
};

export default BusinessProfileForm;
