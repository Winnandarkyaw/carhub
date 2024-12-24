"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarContext } from "@/lib/context/car-context";
import { useContext } from "react";

const BrandSelector = () => {
  const { brands, dispatch, selectedBrand } = useContext(CarContext);

  return (
    <div className="w-full space-y-2">
      <Label className="font-bold text-lg">Brand</Label>
      <Select
        value={selectedBrand || "all"}
        onValueChange={(e) => {
          dispatch?.({ type: "SELECT_BRAND", payload: e == "all" ? null : e });
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Brands</SelectLabel>
            <SelectItem value={"all"}>All</SelectItem>
            {brands.map((brand) => (
              <SelectItem value={brand.brand} key={brand.brand}>
                {brand.brand}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const BrandModelSelector = () => {
  const { dispatch, selectedBrand, selectedBrandModels, selectedModel } =
    useContext(CarContext);

  if (!selectedBrandModels.length) {
    return null;
  }

  return (
    <Select
      value={selectedBrand ? selectedModel || "all" : ""}
      onValueChange={(e) => {
        dispatch?.({ type: "SELECT_MODEL", payload: e == "all" ? null : e });
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>
          <SelectItem value={"all"}>All</SelectItem>

          {selectedBrandModels.map((model) => (
            <SelectItem value={model} key={model}>
              {model}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

function TypeRadioGroup() {
  const { dispatch, type } = useContext(CarContext);

  return (
    <div className="w-full space-y-2">
      <Label className="font-bold text-lg">Type</Label>
      <RadioGroup
        onValueChange={(e) => {
          dispatch?.({ type: "SELECT_TYPE", payload: e });
        }}
        value={type}
        className="flex gap-3 items-center w-full"
      >
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="all" id="all" />
          <Label className="text-sm" htmlFor="all">
            ALL
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="new" id="new" />
          <Label className="text-sm" htmlFor="new">
            New
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="used" id="used" />
          <Label className="text-sm" htmlFor="used">
            Used
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

function StatusFilterCheckBoxes() {
  const { dispatch, chosenStatus } = useContext(CarContext);

  const toggleStatus = (status: string, checked: boolean) => {
    dispatch?.({
      type: "UPDATE_STATUS",
      payload: checked
        ? [...chosenStatus, status]
        : chosenStatus.filter((s) => s != status),
    });
  };

  return (
    <div className="w-full space-y-2">
      <Label className="font-bold text-lg">Status</Label>
      <section className="flex items-center gap-x-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={chosenStatus.includes("available")}
            id="available"
            onCheckedChange={(e) => {
              toggleStatus("available", e as boolean);
            }}
          />
          <label
            htmlFor="available"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Available
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={chosenStatus.includes("sold-out")}
            onCheckedChange={(e) => {
              toggleStatus("sold-out", e as boolean);
            }}
            id="sold-out"
          />
          <label
            htmlFor="sold-out"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Sold out
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={chosenStatus.includes("reserved")}
            onCheckedChange={(e) => {
              toggleStatus("reserved", e as boolean);
            }}
            id="reserved"
          />
          <label
            htmlFor="reserved"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Reserved
          </label>
        </div>
      </section>
    </div>
  );
}

/*function MiniMaxInput() {
  const { dispatch, minPrice, maxPrice } = useContext(CarContext);

  return (
    <div className="w-full space-y-2">
      <Label className="font-bold text-lg">Price Range</Label>
      <section className="grid grid-cols-6 gap-x-2">
        <div className="col-span-3 space-y-2">
          <label
            htmlFor="min"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Minimum Price
          </label>
          <Input
            onChange={(e) => {
              dispatch?.({
                type: "SET_MIN",
                payload: Number(e.target.value) || 0,
              });
            }}
            min={0}
            max={maxPrice - 1}
            id="min"
            type="number"
            placeholder="Minimum Price"
          />
        </div>
        <div className="col-span-3 space-y-2">
          <label
            htmlFor="max"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Maximum Price
          </label>
          <Input
            onChange={(e) => {
              dispatch?.({
                type: "SET_MAX",
                payload: Number(e.target.value) || 0,
              });
            }}
            min={minPrice + 1}
            id="max"
            type="number"
            placeholder="Minimum Price"
          />
        </div>
      </section>
    </div>
  );
}*/
function MiniMaxInput() {
  const { dispatch, minPrice, maxPrice } = useContext(CarContext);

  // Function to handle the min price slider change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(e.target.value) || 0;
    dispatch?.({
      type: "SET_MIN",
      payload: newMinPrice,
    });
  };

  // Function to handle the max price slider change
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Number(e.target.value) || 0;
    dispatch?.({
      type: "SET_MAX",
      payload: newMaxPrice,
    });
  };

  return (
    <div className="w-full space-y-2">
      <Label className="font-bold text-lg">Price Range</Label>
      <section className="grid grid-cols-6 gap-x-2">
        <div className="col-span-3 space-y-2">
          <label
            htmlFor="min"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Minimum Price: ${minPrice}
          </label>
          <input
            type="range"
            id="min"
            min={0}
            max={maxPrice - 1} // Ensure the max price is greater than the min price
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full"
          />
        </div>
        <div className="col-span-3 space-y-2">
          <label
            htmlFor="max"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Maximum Price: ${maxPrice}
          </label>
          <input
            type="range"
            id="max"
            min={minPrice + 1} // Ensure max price is always greater than min price
            max={10000} // Adjust this based on your price range
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
}


const SortBySelectBoxes = () => {
  const { dispatch, selectedSorting } = useContext(CarContext);

  return (
    <div className="w-full space-y-2">
      <Label className="font-bold text-lg">Sort by</Label>
      <Select
        value={selectedSorting || "original"}
        onValueChange={(e) => {
          dispatch?.({
            type: "SELECT_SORT",
            payload: e == "original" ? null : e,
          });
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={"original"}>Original</SelectItem>
            <SelectItem value={"asc-price"}>Price (Ascending)</SelectItem>
            <SelectItem value={"desc-price"}>Price (Descending)</SelectItem>
            <SelectItem value={"asc-year"}>
              Manufacture Year (Ascending)
            </SelectItem>
            <SelectItem value={"desc-year"}>
              Manufacture Year (Descending)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
const Sidebar = () => {
  return (
    <div className="w-full h-full mt-5 space-y-5">
      <BrandSelector />
      <BrandModelSelector />
      <TypeRadioGroup />
      <StatusFilterCheckBoxes />
      <MiniMaxInput />

      <SortBySelectBoxes />
    </div>
  );
};

export default Sidebar;
