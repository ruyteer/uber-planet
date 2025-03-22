"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket, Package, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-28 flex-col items-center py-8 border-r border-zinc-200 bg-white">
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="w-10 h-10 bg-purple-800 rounded-xl flex items-center justify-center">
          <Rocket className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-medium mt-2">UberPlanet</span>
      </div>

      <nav className="flex flex-col items-center gap-6 mt-8">
        <Link href="/">
          <NavItem
            icon={<Package />}
            label="Entregas"
            active={pathname === "/"}
          />
        </Link>
        <Link href="/configuracoes">
          <NavItem
            icon={<Settings />}
            label="Configurações"
            active={pathname === "/configuracoes"}
          />
        </Link>
        <Link href="/conta">
          <NavItem
            icon={<User />}
            label="Conta"
            active={pathname === "/conta"}
          />
        </Link>
      </nav>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          active
            ? "bg-purple-50 text-purple-800"
            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
        )}
      >
        {icon}
      </div>
      <span className="text-xs mt-1 text-center">{label}</span>
    </div>
  );
}
