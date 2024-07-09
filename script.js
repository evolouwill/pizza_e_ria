const todos_sabores = ['Portuguesa', 'Calabresa', 'Costela Barbecue', 'Frango e Catupiry', 'Strogonoff de Carne'];

const pizzas = [
    {
        tamanho: 'Promoção média',
        img_src: 'img/receitas-com-calabresa-1.png',
        valor: 'R$49,99',
        desconto: true,
        sabores: ['Portuguesa', 'Calabresa', 'Frango e Catupiry', 'Strogonoff de Carne']
    },
    {
        tamanho: 'Brotinho',
        img_src: 'img/receitas-com-calabresa-1.png',
        valor: 'R$40,00',
        desconto: false,
        sabores: todos_sabores
    },
    {
        tamanho: 'Médio',
        img_src: 'img/receitas-com-calabresa-1.png',
        valor: 'R$60,00',
        desconto: false,
        sabores: todos_sabores
    },
    {
        tamanho: 'Grande',
        img_src: 'img/receitas-com-calabresa-1.png',
        valor: 'R$79,00',
        desconto: false,
        sabores: todos_sabores
    }
];

function criarElemento(tag, conteudo = '', classe = '') {
    const elemento = document.createElement(tag);
    if (conteudo) elemento.innerText = conteudo;
    if (classe) elemento.className = classe;
    return elemento;
}

function criarPizza(pizza) {
    const divPizza = criarElemento('div', '', pizza.desconto ? 'promocao' : 'tamanho');
    const img = criarElemento('img', '', pizza.desconto ? 'pizza_img_promo' : 'pizza_img');
    img.src = pizza.img_src;
    divPizza.appendChild(img);

    const divDetalhes = criarElemento('div');
    const divPrecinho = criarElemento('div');
    const pTamanho = criarElemento('p', pizza.tamanho);
    const pValor = criarElemento('p', pizza.valor);
    const pSabores = criarElemento('p', `Sabores: ${pizza.sabores.join(', ')}`);
    divPrecinho.appendChild(pTamanho);
    divPrecinho.appendChild(pValor);
    divDetalhes.appendChild(divPrecinho);
    divDetalhes.appendChild(pSabores);

    divPizza.appendChild(divDetalhes);

    divPizza.onclick = function() {
        localStorage.setItem('pizza_escolhida', JSON.stringify(pizza));
        window.location.href = "./sabores/sabores.html";
    }
    return divPizza;
}

function carregarPizzas() {
    var container;
    pizzas.forEach(pizza => {
        if (pizza.desconto) {
            container = document.getElementById('opcao_desconto');
        }
        else {
            container = document.getElementById('opcao_sem_desconto');
        }
        const pizzaElemento = criarPizza(pizza);
        container.appendChild(pizzaElemento);
    });
}

carregarPizzas();