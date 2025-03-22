"use client";

import type React from "react";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import AddressList from "./address-list";
import AddressForm from "./address-form";
import type { Address } from "@/lib/types";

export default function AddressPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [activeTab, setActiveTab] = useState<"shipping" | "billing">(
    "shipping"
  );

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleAddressFormClose = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  return (
    <>
      {showForm ? (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-6">
            <button
              onClick={handleAddressFormClose}
              className="flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar para endereços
            </button>
            <AddressForm
              initialData={editingAddress}
              onSave={handleAddressFormClose}
              onCancel={handleAddressFormClose}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              Gerenciamento de Endereços
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="border-b border-zinc-200">
              <div className="flex">
                <TabButton
                  active={activeTab === "shipping"}
                  onClick={() => setActiveTab("shipping")}
                >
                  Endereços de Entrega
                </TabButton>
                <TabButton
                  active={activeTab === "billing"}
                  onClick={() => setActiveTab("billing")}
                >
                  Endereços de Cobrança
                </TabButton>
              </div>
            </div>

            <div className="p-6">
              <AddressList
                type={activeTab}
                onEdit={handleEditAddress}
                onAdd={() => setShowForm(true)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-4 text-sm font-medium",
        active
          ? "border-b-2 border-purple-800 text-purple-800"
          : "text-zinc-500 hover:text-zinc-900"
      )}
    >
      {children}
    </button>
  );
}
