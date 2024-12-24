"use client";

import CarCard from "@/component/car-card";
import { Input } from "@/components/ui/input";
import { CarContext } from "@/lib/context/car-context";
import { useContext } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export default function Home() {
  const { dispatch, filterName, carData, noOfPage, page } =
    useContext(CarContext);

  return (
    <div className="w-full ">
      <div className="w-full ">
        <Input
          value={filterName}
          onChange={(e) => {
            dispatch?.({ type: "FILTER_NAME", payload: e.target.value });
          }}
          placeholder="Search car by their name...."
          className="py-6 px-3 mb-5"
        />
      </div>
      <div className="con-span-full grid grid-cols-12  gap-2">
        {carData.length ? (
          carData.map((car) => <CarCard data={car} key={car.title} />)
        ) : (
          <h1 className="text-2xl text-center py-5 col-span-full">
            No Car Matched
          </h1>
        )}
      </div>
      {
        !!carData.length &&  <div className="w-full">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page == 1) {
                    return;
                  }
                  dispatch?.({
                    type: "SET_PAGE",
                    payload: page - 1,
                  });
                }}
              />
            </PaginationItem>
            {Array(noOfPage)
              .fill(0)
              .map((el, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    className={cn(index + 1 == page ? "bg-slate-300" : "")}
                    onClick={() => {
                      dispatch?.({
                        type: "SET_PAGE",
                        payload: index + 1,
                      });
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (page == noOfPage) {
                    return;
                  }
                  dispatch?.({
                    type: "SET_PAGE",
                    payload: page + 1,
                  });
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      }
    </div>
  );
}
