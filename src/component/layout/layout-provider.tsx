import React from "react";
import Sidebar from "./sidebar";
import { CarContextProvider } from "@/lib/context/car-context";

type LayoutProviderType = {
  children: React.ReactNode;
};

const LayoutProvider = ({ children }: LayoutProviderType) => {
  return (
    <CarContextProvider>
      <div className="w-full ">
        <div className="lg:w-[25%] w-full p-3 border-r shadow-sm h-full lg:fixed relative top-0 left-0">
          <h1 className="text-2xl font-bold">Car HUB</h1>
          <Sidebar />
        </div>

        <div className="lg:w-[75%] w-full p-6 lg:ml-[25%]">{children}</div>
      </div>
    </CarContextProvider>
  );
};

export default LayoutProvider;
