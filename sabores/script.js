var pizza_localStorage = localStorage.getItem("pizza_escolhida");
const pizza = JSON.parse(pizza_localStorage);
let saboresSelecionados = [];

function criarElemento(tag, conteudo = "", classe = "") {
  const elemento = document.createElement(tag);
  if (conteudo) elemento.innerText = conteudo;
  if (classe) elemento.className = classe;
  return elemento;
}

function atualizarSaboresEscolhidos() {
  saboresSelecionados = Array.from(document.querySelectorAll(".sabor input:checked")).map(
    (checkbox) => checkbox.value
  );
  const divSaboresEscolhidos = document.querySelector(".pizzaInfo .saboresEscolhidos");
  divSaboresEscolhidos.innerHTML = "";

  saboresSelecionados.forEach((sabor) => {
    divSaboresEscolhidos.appendChild(criarElemento("li", sabor));
  });

  const checkboxes = document.querySelectorAll(".sabor input");
  if (saboresSelecionados.length >= 3) {
    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = true;
      }
    });
  } else {
    checkboxes.forEach((checkbox) => {
      checkbox.disabled = false;
    });
  }
}

function comprarPizza(pizza) {
  const divSabores = criarElemento("div", "", "sabores");
  pizza.sabores.forEach((sabor) => {
    const divSabor = criarElemento("div", "", "sabor");
    const inputSabor = criarElemento("input");
    inputSabor.type = "checkbox";
    inputSabor.value = sabor;
    inputSabor.onchange = atualizarSaboresEscolhidos;

    const pSabor = criarElemento("p", `Sabor: ${sabor}`, "textoSabor");
    divSabor.appendChild(inputSabor);
    divSabor.appendChild(pSabor);
    divSabores.appendChild(divSabor);
  });

  return divSabores;
}

function mostrarPizzas(pizza) {
  const divTotal = criarElemento("div", "", "divCompra");
  const divDados = criarElemento("div", "", "pizzaInfo");
  divDados.appendChild(criarElemento("p", `Pizza: ${pizza.tamanho}`));
  divDados.appendChild(criarElemento("p", "Sabores escolhidos: "));
  const divSaboresEscolhidos = criarElemento("ul", "", "saboresEscolhidos");
  divDados.appendChild(divSaboresEscolhidos);

  divTotal.appendChild(divDados);

  const divPreco = criarElemento("div", "", "divPreco");
  divPreco.appendChild(criarElemento("p", `${pizza.valor}`));
  const botaoPedir = criarElemento("button", "Pedir");
  botaoPedir.onclick = alertPedido;
  divPreco.appendChild(botaoPedir);
  divTotal.appendChild(divPreco);

  return divTotal;
}

function alertPedido() {
  alert("Pizza tamanho " + pizza.tamanho + ". \n Sabores: " + saboresSelecionados.join(", "));
}

const divPizza = document.querySelector("#sabores");
divPizza.appendChild(comprarPizza(pizza));
const divCaixa = document.querySelector("#sectionPagamento");
divCaixa.appendChild(mostrarPizzas(pizza));
