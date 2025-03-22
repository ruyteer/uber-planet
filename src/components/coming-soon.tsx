import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-zinc-200 p-8 text-center">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">{title}</h1>
        <p className="text-zinc-600 mb-8">
          {description || "Esta funcionalidade estará disponível em breve."}
        </p>
        <Link href="/">
          <Button className="bg-purple-800 hover:bg-purple-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Endereços
          </Button>
        </Link>
      </div>
    </div>
  );
}
