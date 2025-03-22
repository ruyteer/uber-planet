"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddressCard from "./address-card";
import SearchBar from "./search-bar";
import type { Address } from "@/lib/types";
import { useAddressStore } from "@/lib/store";

interface AddressListProps {
  type: "shipping" | "billing";
  onEdit: (address: Address) => void;
  onAdd: () => void;
}

export default function AddressList({ type, onEdit, onAdd }: AddressListProps) {
  const { addresses, removeAddress } = useAddressStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAddresses = addresses.filter((address) => {
    if (address.addressType !== type) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();

    if (
      address.label.toLowerCase().includes(query) ||
      address.name.toLowerCase().includes(query) ||
      address.phone.includes(query)
    )
      return true;

    if (
      address.planetType === "earth" &&
      (address.addressLine?.toLowerCase().includes(query) ||
        address.city?.toLowerCase().includes(query) ||
        address.state?.toLowerCase().includes(query) ||
        address.zipCode?.includes(query) ||
        address.country?.toLowerCase().includes(query))
    )
      return true;

    if (address.planetType === "mars" && address.marsLot?.includes(query)) {
      return true;
    }

    return false;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar por nome, endereço ou número de lote..."
          className="flex-1"
        />
        <Button onClick={onAdd} className="bg-purple-800 hover:bg-purple-900">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar endereço
        </Button>
      </div>

      {filteredAddresses.length > 0 ? (
        <div className="space-y-4">
          {filteredAddresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => onEdit(address)}
              onDelete={() => removeAddress(address.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-zinc-200 rounded-lg">
          <h3 className="text-lg font-medium text-zinc-900 mb-1">
            Nenhum endereço encontrado
          </h3>
          <p className="text-zinc-500 mb-4">
            {searchQuery
              ? "Tente ajustar seus termos de busca"
              : "Adicione seu primeiro endereço para começar"}
          </p>
          {!searchQuery && (
            <Button onClick={onAdd} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar seu primeiro endereço
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
