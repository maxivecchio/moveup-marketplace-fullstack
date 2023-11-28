import React, { useState, useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { useAuth } from "../../context/AuthContext";
import BusinessProfileForm from "../../components/BusinessProfileForm";
import { Link } from "react-router-dom";
import axios from "axios";
import MyProducts from "./MyProducts";

const MyProfile = () => {
  const {
    userProfile,
    token,
    isBusiness,
    businessFullProfile,
    fetchUserProfile,
  } = useAuth();

  const handleMakeBusiness = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3022/api/users/${userProfile._id}`,
        {
          isBusiness: true,
          displayname: null,
          username: null,
          businessContact: null,
          businessAddress: null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(userProfile._id);
      fetchUserProfile(userProfile._id);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error.message);
    }
  };

  if (!userProfile) {
    return (
      <div className="w-full flex justify-center mt-24">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="sm:h-28 md:h-64 bg-[#F4E8F3] flex px-4 pt-8 md:px-16 md:py-0 text-muted flex-col md:justify-center gap-y-2">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
          User Profile
        </h2>
      </div>
      {!isBusiness ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-background">
            <main>
              <div className="relative isolate">
                <svg
                  className="absolute inset-x-0 top-0 -z-10 h-[34rem] w-full stroke-foreground/30 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                      width={200}
                      height={200}
                      x="50%"
                      y={-1}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                  </defs>
                  <svg
                    x="50%"
                    y={-1}
                    className="overflow-visible fill-secondary/50"
                  >
                    <path
                      d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                      strokeWidth={0}
                    />
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
                  />
                </svg>
                <div
                  className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                  aria-hidden="true"
                ></div>
                <div className="overflow-hidden">
                  <div className="mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                    <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                      <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                        <h1 className="text-2xl font-bold tracking-tight text-muted dark:text-primary/90 sm:text-4xl">
                          Start Selling
                        </h1>
                        <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                          Publish your most beloved garments, from vintage
                          pieces to the latest trends, and discover a global
                          audience eager to embrace your style. At MoveUp, we
                          make the process easy and exciting. Your wardrobe has
                          stories to tell, and we're here to help you tell them!
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                          <Button
                            onClick={handleMakeBusiness}
                            color="secondary"
                            variant="ghost"
                            className="text-lg"
                          >
                            Switch to Business Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : !businessFullProfile ? (
        <BusinessProfileForm
          userProfile={userProfile}
          token={token}
          fetchUserProfile={fetchUserProfile}
        />
      ) : (
        <>
          <div className="max-w-7xl mt-8 mx-auto">
            <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
              Manage Your Products
            </h1>
            <div>
              <MyProducts userProfile={userProfile} token={token} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyProfile;
