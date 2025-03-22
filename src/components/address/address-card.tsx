"use client";

import { MapPin, Building, Home, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Address, PlanetType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
}: AddressCardProps) {
  const getIcon = () => {
    switch (address.label) {
      case "Casa":
        return <Home className="h-5 w-5" />;
      case "Trabalho":
        return <Building className="h-5 w-5" />;
      case "Fábrica":
        return <Warehouse className="h-5 w-5" />;
      case "Armazém":
        return <Warehouse className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getPlanetColor = () => {
    return address.planetType === PlanetType.MARS
      ? "bg-red-50 text-red-600 border-red-100"
      : "bg-blue-50 text-blue-600 border-blue-100";
  };

  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
              address.planetType === PlanetType.MARS
                ? "bg-red-50"
                : "bg-blue-50"
            )}
          >
            {getIcon()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-zinc-500">
                {address.label}
              </span>
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full border",
                  getPlanetColor()
                )}
              >
                {address.planetType === PlanetType.MARS ? "Marte" : "Terra"}
              </span>
            </div>

            <h3 className="text-lg font-medium text-zinc-900 truncate">
              {address.name}
            </h3>
            <p className="text-zinc-500">{address.phone}</p>

            {address.planetType === PlanetType.EARTH ? (
              <p className="text-sm text-zinc-600 mt-2 line-clamp-2">
                {address.addressLine}, {address.city}, {address.state}{" "}
                {address.zipCode}, {address.country}
              </p>
            ) : (
              <p className="text-sm text-zinc-600 mt-2">
                <span className="font-medium">Lote em Marte:</span>{" "}
                {address.marsLot}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-100">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="text-zinc-600"
          >
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
