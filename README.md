### Sistema de Entrega Interplanetária





Um sistema moderno para gerenciamento de endereços de entrega entre Terra e Marte. Esta aplicação permite o cadastro, edição e exclusão de endereços em ambos os planetas, com validações específicas para cada um.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança e produtividade
- **Tailwind CSS** - Estilização utilitária e responsiva
- **Zustand** - Gerenciamento de estado com persistência
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Lucide React** - Ícones modernos e consistentes
- **REST Countries API** - Integração para lista de países


## ✨ Funcionalidades

### Gerenciamento de Endereços

- **Cadastro de endereços** para Terra e Marte
- **Edição e exclusão** de endereços existentes
- **Visualização em lista** com cards informativos
- **Filtragem** entre endereços de entrega e cobrança
- **Busca** por nome, endereço ou número de lote


### Validações Específicas por Planeta

- **Terra**: Validação de nome, telefone, endereço, país, estado, cidade e CEP
- **Marte**: Validação de nome, telefone e número de lote (exatamente 4 dígitos)


### Interface Responsiva

- **Layout adaptativo** para dispositivos móveis e desktop
- **Navegação intuitiva** com sidebar e tabs
- **Feedback visual** para ações do usuário
- **Páginas de erro** personalizadas


### Armazenamento Local

- **Persistência de dados** no localStorage do navegador
- **Carregamento automático** de endereços salvos


## 📁 Estrutura do Projeto

```plaintext
├── app/                      # Rotas e páginas da aplicação
│   ├── configuracoes/        # Página de configurações (em breve)
│   ├── conta/                # Página de conta (em breve)
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout principal da aplicação
│   ├── not-found.tsx         # Página 404 personalizada
│   └── page.tsx              # Página inicial (gerenciamento de endereços)
│
├── components/               # Componentes reutilizáveis
│   ├── address/              # Componentes específicos de endereço
│   │   ├── address-card.tsx  # Card de visualização de endereço
│   │   ├── address-form.tsx  # Formulário de cadastro/edição
│   │   ├── address-list.tsx  # Lista de endereços
│   │   ├── address-page.tsx  # Página principal de endereços
│   │   └── search-bar.tsx    # Barra de busca
│   │
│   ├── layout/               # Componentes de layout
│   │   ├── header.tsx        # Cabeçalho da aplicação
│   │   └── sidebar.tsx       # Barra lateral de navegação
│   │
│   ├── ui/                   # Componentes de UI (shadcn/ui)
│   ├── country-select.tsx    # Componente de seleção de países
│   └── coming-soon.tsx       # Componente para páginas em desenvolvimento
│
├── lib/                      # Utilitários e lógica de negócio
│   ├── store.ts              # Estado global com Zustand
│   ├── types.ts              # Tipos e interfaces TypeScript
│   ├── use-countries.ts      # Hook para buscar países da API
│   └── utils.ts              # Funções utilitárias
│
├── public/                   # Arquivos estáticos
├── tailwind.config.ts        # Configuração do Tailwind CSS
└── package.json              # Dependências e scripts
```

## 🔧 Como Executar o Projeto

1. **Clone o repositório**

```shellscript
git clone https://github.com/ruyteer/uber-planet.git uber-planet
cd uber-planet
```


2. **Instale as dependências**

```shellscript
npm install
# ou
yarn install
# ou
pnpm install
```


3. **Execute o servidor de desenvolvimento**

```shellscript
npm run dev
# ou
yarn dev
# ou
pnpm dev
```


4. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

Desenvolvido por Ruyter Araujo Rocha - 2025
