// Variáveis globais
var valor_input = "0"
var numero_novo = true;
var finalVal;
var controle = false;
var historico_div_text = document.getElementById("hist");

// Eventos para o clique de cada botão
function aposCarregar() {
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
function atualizaDisplay() {
    $(".input-field").text(valor_input);
    if ($(".input-field").text().length > 8) {
        alert("Máximo de caracteres excedido.");
        $(".input-field").text("Error");
        $(".input-field").val("error");
    }
}

// Armazena os operadores, fazendo um callback na hora de montar o histórico.
function sinal(operador) {
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
    numero_novo = true;
    $(".input-field").text("0");
    historico_div_text.innerText += `${valor_input + " " + symbol}`;
    historico_div_text.innerText.replace("undefined", "0");
}

// Função responsável por inverter o sinal do input field.
function trocaSinal() {
    valor_input = (valor_input * -1);
    atualizaDisplay();
}

// Função referente aos números da calculadora.
function botao(elem) {
    if (numero_novo == true) {
        valor_input = '' + elem;
        numero_novo = false;
    } else {
        valor_input += elem;
    }
    atualizaDisplay();
}

// Função ref. ao botão All Clear.
function limpaHistorico() {
    numero_novo = true;
    valor_input = '0';
    historico_div_text.innerText = "";
    atualizaDisplay();
}
// Função ref. ao botão Clear.
function limpaUltimoInserido() {
    let historico_completo = historico_div_text.innerText.split(" ").join("");
    let provisorio = historico_completo.substring(0, historico_completo.length - 3);
    historico_div_text.innerText = provisorio;
    valor_input = "0";
}

// Função para mostrar o resultado, recebe como parâmetro o histórico, sendo que é retornado o calculo da expressão inteira.
function mostraRes(operacao) {
    historico_div_text.innerText += valor_input
    let full_operacao = operacao.innerText.split(" ").join("");
    let calculo_expressao = new Function('return ' + full_operacao)();
    valor_input = calculo_expressao;
    atualizaDisplay();
    historico_div_text.innerText = "";
    numero_novo = true;
}