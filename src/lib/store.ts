"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "./types";

interface AddressState {
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],

      addAddress: (address) =>
        set((state) => ({
          addresses: [...state.addresses, address],
        })),

      updateAddress: (updatedAddress) =>
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address
          ),
        })),

      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((address) => address.id !== id),
        })),
    }),
    {
      name: "address-storage",
    }
  )
);
