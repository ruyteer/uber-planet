import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-zinc-200 p-8 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🚀</span>
        </div>
        <h1 className="text-3xl font-bold text-purple-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-zinc-800 mb-4">
          Página não encontrada
        </h2>
        <p className="text-zinc-600 mb-8">
          Parece que você está tentando acessar uma página que não existe ou foi
          movida para outro endereço.
        </p>
        <Link href="/">
          <Button className="bg-purple-800 hover:bg-purple-900">
            <Home className="h-4 w-4 mr-2" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </div>
  );
}
