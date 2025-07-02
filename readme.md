loja-digital/
│
├── public/                     # Arquivos visíveis pelo navegador
│   ├── index.html              # Estrutura principal do site
│   ├── style.css               # Estilos globais
│   ├── produtos.json           # Lista de produtos (simulando banco)
│   └── assets/                 # Imagens, ícones, etc.
│       └── produtos/
│           ├── camisa-polo.jpg
│           └── tenis-esportivo.jpg
│
├── src/                        # Lógica JS modular
│   ├── app.js                  # Entrada principal
│   ├── render/
│   │   └── renderProdutos.js   # Gera os cards dinamicamente
│   ├── data/
│   │   └── fetchProdutos.js    # Função para carregar produtos
│   ├── utils/
│   │   └── formatador.js       # Formata preço, cria links WhatsApp
│   └── config.js               # Configuração (número do WhatsApp etc.)
│
├── backend/                    # Opcional: servidor Node ou Firebase
│   └── api.js                  # API para servir produtos (futuro)
│
├── deploy/                     # Scripts de deploy (Netlify, Vercel, Firebase)
│   ├── netlify.toml
│   └── vercel.json
│
├── .gitignore
├── README.md
└── package.json                # Configuração do projeto
