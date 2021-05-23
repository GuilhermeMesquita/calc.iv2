// Variáveis globais
var valor_input = "0";
var numero_novo = true;
var historico_div_text = document.getElementById("hist");

// Eventos para o clique de cada botão
const aposCarregar = () => {
    $("#btnAC").on("click", function () {
        limpaHistorico();
    });
    $("#btnC").on("click", function () {
        limpaUltimoInserido();
    });
    $(".btnNumbers").on("click", function () {
        botao(Number(this.innerText));
    });
    $(".btnOperadores").on("click", function () {
        sinal(this.innerText);
    });
    $("#btnTrocaSinal").on("click", function () {
        trocaSinal();
    });
    $("#btnIgual").on("click", function () {
        mostraRes(document.querySelector("#hist"));
    });
}

// Função responsável por atualizar o input principal da calculadora.
const atualizaDisplay = () => {
    $(".input-field").text(valor_input);
    if ($(".input-field").text().length > 8 && typeof (valor_input) == "number") {
        alert("Máximo de caracteres excedido.");
        $(".input-field").text("Error");
        $(".input-field").val("error");
        numero_novo = "true";
    }
}

// Armazena os operadores, fazendo um callback na hora de montar o histórico.
const sinal = (operador) => {
    switch (operador) {
        case '-': calculo('-');
            break;
        case '+': calculo('+');
            break;
        case '*': calculo('*');
            break;
        case '/': calculo('/');
            break;
    }
}

// Responsável por montar o histórico da calculadora
function calculo(symbol) {
    historico_div_text.innerText += `${$(".input-field").text() + " " + symbol}`;
    historico_div_text.innerText.replace("undefined", "0");

    $(".input-field").text("0");
    numero_novo = true;
}

// Função responsável por inverter o sinal do input field.
const trocaSinal = () => {
    valor_input = valor_input * -1;
    atualizaDisplay();
}

// Função referente aos números da calculadora.
const botao = (elem) => {
    if (numero_novo == true) {
        valor_input = '' + elem;
        numero_novo = false;
    } else {
        valor_input += elem;
    }
    numero_novo = "true";
    atualizaDisplay();
}

// Função ref. ao botão All Clear.
const limpaHistorico = () => {
    numero_novo = true;
    valor_input = '0';
    historico_div_text.innerText = "";
    atualizaDisplay();
}
// Função ref. ao botão Clear.
const limpaUltimoInserido = () => {
    let historico_completo = historico_div_text.innerText.split(" ");
    let ultimo_elem = historico_completo[historico_completo.length - 1] + "a";
    let ultimo_elem_numeral = historico_completo[historico_completo.length - 2];

    historico_div_text.innerText = historico_div_text.innerText.replace(ultimo_elem, "");
    historico_div_text.innerText = historico_div_text.innerText.replace(ultimo_elem_numeral, "");
    valor_input = "0";
}

// Função para mostrar o resultado, recebe como parâmetro o histórico, sendo que é retornado o calculo da expressão inteira.
const mostraRes = (operacao) => {
    if ($(".input-field").text() != "0") {
        historico_div_text.innerText += $(".input-field").text();
        var full_operacao = operacao.innerText.split(" ").join("");
        let calculo_expressao = new Function('return ' + full_operacao)();
        let sucessor_virgula = calculo_expressao.toFixed(2).split(".")[1];
        for (var i = 0; i < sucessor_virgula.length; i++) {
            let valor_quebrado = sucessor_virgula.split("");
            if (valor_quebrado[0] > 5) {
                let prov = Number(calculo_expressao.toFixed(2).split(".")[0]) + 1;
                var res = parseInt(prov);
            } else {
                prov = Number(calculo_expressao.toFixed(2).split(".")[0]);
                res = parseInt(prov);
            }
            valor_input = res;
        }
    } else {
        full_operacao = historico_div_text.innerText.replace(/.$/, '');
        valor_input = "Syntax Error";
    }
    atualizaDisplay();
    numero_novo = true;
    historico_div_text.innerText = "";
}