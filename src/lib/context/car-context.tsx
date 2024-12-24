"use client";

import React, { createContext, useReducer } from "react";

const _cars = [
  {
    title: "Toyota Corolla",
    brand: "Toyota",
    model: "Corolla",
    type: "New",
    manufactureYear: 2023,
    price: 2000,
    status: "Available",
  },
  {
    title: "Toyota Camry",
    brand: "Toyota",
    model: "Camry",
    type: "Used",
    manufactureYear: 2020,
    price: 1800,
    status: "Sold-out",
  },
  {
    title: "Honda Civic",
    brand: "Honda",
    model: "Civic",
    type: "Used",
    manufactureYear: 2019,
    price: 1500,
    status: "Available",
  },
  {
    title: "Honda Accord",
    brand: "Honda",
    model: "Accord",
    type: "New",
    manufactureYear: 2022,
    price: 2500,
    status: "Available",
  },
  {
    title: "Ford Mustang",
    brand: "Ford",
    model: "Mustang",
    type: "New",
    manufactureYear: 2023,
    price: 3000,
    status: "Available",
  },
  {
    title: "Ford Explorer",
    brand: "Ford",
    model: "Explorer",
    type: "Used",
    manufactureYear: 2021,
    price: 2700,
    status: "Sold-out",
  },
  {
    title: "Nissan Altima",
    brand: "Nissan",
    model: "Altima",
    type: "Used",
    manufactureYear: 2018,
    price: 1300,
    status: "Available",
  },
  {
    title: "Nissan Rogue",
    brand: "Nissan",
    model: "Rogue",
    type: "New",
    manufactureYear: 2023,
    price: 2200,
    status: "Available",
  },
  {
    title: "BMW X5",
    brand: "BMW",
    model: "X5",
    type: "New",
    manufactureYear: 2023,
    price: 45000,
    status: "Available",
  },
  {
    title: "BMW 3 Series",
    brand: "BMW",
    model: "3 Series",
    type: "Used",
    manufactureYear: 2020,
    price: 32000,
    status: "Sold-out",
  },
];

const _brands = [
  { brand: "Toyota", models: ["Corolla", "Camry", "RAV4", "Highlander"] },
  { brand: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot"] },
  { brand: "Ford", models: ["Mustang", "Explorer", "F-150", "Escape"] },
  { brand: "Nissan", models: ["Altima", "Rogue", "Sentra", "Pathfinder"] },
  { brand: "BMW", models: ["3 Series", "X5", "X3", "5 Series"] },
];

type ReducerStateType = {
  selectedBrand: string | null;
  selectedModel: string | null;
  selectedBrandModels: string[] | [];
  type: "all" | "used" | "new";
  filterName: string;
  chosenStatus: string[];
  carData: typeof _cars;
  selectedSorting: string | null;
  minPrice: number;
  maxPrice: number;
  page: number;
  noOfPage: number;
};

type ContextType = {
  brands: typeof _brands;
  dispatch: React.ActionDispatch<any> | null;
} & ReducerStateType;

const initialState: ReducerStateType = {
  selectedBrand: null,
  selectedBrandModels: [],
  selectedModel: null,
  filterName: "",
  type: "all",
  chosenStatus: [],
  carData: _cars,
  selectedSorting: null,
  minPrice: 0,
  maxPrice: 100000,
  page: 1,
  noOfPage: 1,
};

export const CarContext = createContext<ContextType>({
  ...initialState,
  brands: _brands,
  dispatch: null,
  type: "all",
});

const reducer = (
  state: ReducerStateType,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SELECT_BRAND":
      state.selectedBrand = action.payload;
      state.selectedBrandModels =
        _brands.find((i) => i.brand == action.payload)?.models || [];
      state.selectedModel = null;
      break;

    case "SELECT_MODEL":
      state.selectedModel = action.payload;
      break;

    case "FILTER_NAME":
      state.filterName = action.payload;
      break;

    case "SELECT_TYPE":
      state.type = action.payload;
      break;

    case "UPDATE_STATUS":
      state.chosenStatus = action.payload;
      break;

    case "SELECT_SORT":
      state.selectedSorting = action.payload;
      break;

    case "SET_MIN":
      state.minPrice = action.payload;
      break;

    case "SET_MAX":
      state.maxPrice = action.payload;
      break;

    case "SET_PAGE":
      state.page = action.payload;
      break;
  }

  let carData = state.selectedBrand
    ? _cars
        .map((el) => JSON.parse(JSON.stringify(el)))
        .filter(
          (e) => e.brand.toLowerCase() == state.selectedBrand?.toLowerCase()
        )
    : _cars.map((el) => JSON.parse(JSON.stringify(el)));

  if (state.selectedModel) {
    carData = carData.filter(
      (e) => e.model.toLocaleLowerCase() == state.selectedModel?.toLowerCase()
    );
  }

  if (!!state.filterName) {
    carData = carData.filter((e) =>
      new RegExp(state.filterName, "i").test(e.title)
    );
  }

  if (state.type && state.type != "all") {
    carData = carData.filter(
      (e) => e.type.toLocaleLowerCase() == state.type?.toLowerCase()
    );
  }

  if (state.chosenStatus.length) {
    carData = carData.filter((e) =>
      state.chosenStatus.includes(e.status.toLocaleLowerCase())
    );
  }

  if (state.minPrice) {
    carData = carData.filter((e) => +e.price >= state.minPrice);
  }

  if (state.maxPrice) {
    carData = carData.filter((e) => +e.price <= state.maxPrice);
  }

  if (state.selectedSorting) {
    if (state.selectedSorting === "asc-price") {
      carData = carData.sort((a, b) => a.price - b.price);
    } else if (state.selectedSorting === "desc-price") {
      carData = carData.sort((a, b) => b.price - a.price);
    } else if (state.selectedSorting === "asc-year") {
      carData = carData.sort((a, b) => a.manufactureYear - b.manufactureYear);
    } else if (state.selectedSorting === "desc-year") {
      carData = carData.sort((a, b) => b.manufactureYear - a.manufactureYear);
    }
  }

  state.noOfPage = Math.ceil(carData.length / 5);

  if (state.page > state.noOfPage) {
    state.page = 1;
  }

  if (state.page) {
    const start_index = (state.page - 1) * 5;
    const end_index = start_index + 5;

    carData = carData.slice(start_index, end_index);
  }

  state.carData = carData;
  return { ...state };
};

export const CarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer<ReducerStateType, any>(reducer, {
    ...initialState,

    carData: _cars.slice(0, 5),
    noOfPage: Math.ceil(_cars.length / 5),
  });

  return (
    <CarContext.Provider value={{ ...state, brands: _brands, dispatch }}>
      {children}
    </CarContext.Provider>
  );
};
