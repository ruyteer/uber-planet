"use client";

import { useState, useEffect } from "react";

interface Country {
  name: string;
  code: string;
  flag: string;
}

const brazilFlag = "https://flagcdn.com/w320/br.png";

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,flags"
        );
        const data = await response.json();

        const formattedCountries = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            flag: country.flags.png || brazilFlag,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar países:", error);

        setCountries([
          { name: "Brasil", code: "BR", flag: brazilFlag },
          { name: "Estados Unidos", code: "US", flag: brazilFlag },
          { name: "Portugal", code: "PT", flag: brazilFlag },
          { name: "Espanha", code: "ES", flag: brazilFlag },
          { name: "França", code: "FR", flag: brazilFlag },
          { name: "Alemanha", code: "DE", flag: brazilFlag },
          { name: "Itália", code: "IT", flag: brazilFlag },
          { name: "Reino Unido", code: "GB", flag: brazilFlag },
          { name: "Japão", code: "JP", flag: brazilFlag },
          { name: "China", code: "CN", flag: brazilFlag },
        ]);
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return { countries, isLoading };
}
