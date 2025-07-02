const categorias = [
  { nome: "Bolsas / Malas", icone: "fa-solid fa-suitcase-rolling" },
  { nome: "Brindes Femininos", icone: "fa-solid fa-gift" },
  { nome: "Brindes Masculinos", icone: "fa-solid fa-gifts" },
  { nome: "Canecas", icone: "fa-solid fa-mug-hot" },
  { nome: "Diversos", icone: "fa-solid fa-circle-notch" },
  { nome: "Eco Bag / Sacolas", icone: "fa-solid fa-leaf" },
  { nome: "Eletrônicos", icone: "fa-solid fa-headphones" },
  { nome: "Garrafas / Squeeze", icone: "fa-solid fa-bottle-water" },
  { nome: "Necessaire", icone: "fa-solid fa-briefcase-medical" },
  { nome: "Kits", icone: "fa-solid fa-box" },
  { nome: "Mochilas", icone: "fa-solid fa-backpack" },
  { nome: "Pastas", icone: "fa-solid fa-folder" },
  { nome: "Porta Vinhos", icone: "fa-solid fa-wine-bottle" },
  { nome: "Térmicas", icone: "fa-solid fa-temperature-full" }
];

const sidebar = document.getElementById("sidebarCategorias");
categorias.forEach(cat => {
  const link = document.createElement("a");
  link.href = "#";
  link.className = "categoria-item";
  link.innerHTML = `<i class="${cat.icone}"></i> <span>${cat.nome}</span>`;
  link.addEventListener("click", e => {
    e.preventDefault();
    filtrarCategoria(cat.nome);
  });
  sidebar.appendChild(link);
});

async function carregarProdutos() {
  try {
    const res = await fetch('/api/produtos');
    if (!res.ok) throw new Error("Erro ao carregar produtos");
    const produtos = await res.json();
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    produtos.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-categoria', produto.categoria);

      card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Código:</strong> ${produto.codigo}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Fornecedor:</strong> ${produto.fornecedor}</p>
        ${produto.imagem ? `<img src="image/${produto.imagem}" alt="${produto.nome}" loading="lazy">` : ''}
        <button onclick="contato('${encodeURIComponent(produto.whatsapp_mensagem)}')">Entrar em Contato</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    document.getElementById('produtos-container').innerHTML = `<p>Erro ao carregar produtos.</p>`;
  }
}

function contato(mensagem) {
  const numero = '5599999999999'; // Substitua com o número da empresa
  const url = `https://wa.me/${numero}?text=${mensagem}`;
  window.open(url, '_blank');
}

function filtrarCategoria(categoria) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-categoria');
    card.style.display = (cat === categoria) ? 'block' : 'none';
  });
}


document.getElementById("toggleSidebar").addEventListener("click", () => {
  document.getElementById("sidebarCategorias").classList.toggle("ativa");
});



carregarProdutos();
