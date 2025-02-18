"use client"
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useState } from "react";

function BasketPage() {
    const groupedItems = useBasketStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsClient(true);
      }, []);
    
      if (!isClient) return <Loader />;

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
                <p className="text-gray-600 text-lg">Your Basket is Empty</p>

            </div>
        )
    }


    const handleCheckout = async() => {
      if (!isSignedIn) return;
      setIsLoading(true);

      try {
        const metadata: Metadata = {
          orderNumber: crypto.randomUUID(),
          customerName: user?.fullName ?? "Unknown",
          customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
          clerkUserId: user!.id,
        };
        
        const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      } catch (error) {
        console.error("Error Creating Checkout Session:", error)
      } finally {
        setIsLoading(false);
      }
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
          <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
          {groupedItems.length === 0 ? (
            <p className="text-cyan-600 text-lg">Your Basket is Empty</p>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow">
                {groupedItems?.map((item) => {
                  const selectedSizeDetails = item.product.sizes?.find(
                    (size) => size.size === item.size
                  );
      
                  return (
                    <div
                      key={`${item.product._id}-${item.size}`}
                      className="mb-4 p-4 border rounded flex items-center justify-between"
                    >
                      <div
                      className="flex items-center cursor-pointer flex-1 min-w-0"
                      onClick={() => 
                        router.push(`/product/${item.product.slug?.current}`)
                      }
                      >
                        <div 
                                  className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4"
                              >{item.product.images && (
                                <Image
                                src={imageUrl(item.product.images[0]).url()}
                                alt={item.product.name ?? "Product image"}
                                className="w-full h-full object-cover rounded"
                                sizes="(max-width: 639px) 80px, 96px"
                                width={96}
                                height={96}
                                priority={true}
                              />
                                  )}

                              </div>
                              <div className="min-w-0">
                                  <h2 className="text-base font-semibold truncate sm:text-lg md:text-xl">
                                      {item.product.name}
                                  </h2>
                                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                                      <p className="text-sm text-gray-600 sm:text-base">
                                          Size: <span className="font-medium text-cyan-600">{item.selectedSizeDetails?.size}</span>
                                      </p>
                                      <span className="hidden text-transparent sm:inline">••</span>
                                      <p className="text-sm font-medium sm:text-base">
                                          ${((item.selectedSizeDetails?.price ?? 0) * item.quantity).toFixed(2)}
                                      </p>
                                  </div>
                              </div>
                      </div>
                      <div className="flex items-center ml-4 flex-shrink-0">
                        <AddToBasketButton
                          product={item.product}
                          selectedSize={item.size}
                          selectedSizeDetails={selectedSizeDetails}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <div className="mt-4 space-y-2">
                  <p className="flex justify-between">
                    <span>Items:</span>
                    <span>
                      {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  </p>
                  <p className="flex justify-between text-2xl font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>
                    💲{useBasketStore.getState().getTotalPrice().toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              {isSignedIn ? (
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="px-8 w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 
            text-white rounded-lg text-sm font-medium 
            transition-all duration-200 hover:from-violet-700 hover:to-indigo-700 
            hover:shadow-lg hover:-translate-y-0.5
            disabled:from-gray-400 disabled:to-gray-500 disabled:hover:translate-y-0 
            disabled:hover:shadow-none disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button
                    className="px-8 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 
              text-white rounded-lg text-sm font-medium 
              transition-all duration-200 hover:from-violet-700 hover:to-indigo-700 
              hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Sign In to Checkout
                  </button>
                </SignInButton>
              )}

              <div className="h-64 lg:h-0">
                {/* Spacer for fixed checkout on mobile */}
              </div>
            </div>
          )}
        </div>
      );
}

export default BasketPage;