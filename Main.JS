$(document).ready(function () {
  let valorAtual = "";
  let operacaoAtual = null;
  let valorAnterior = null;

  function atualizarDisplay(texto) {
    const textoSemIgual = texto.includes("=")
      ? texto.split("=")[0].trim()
      : texto.trim();

    $("#display p").text(textoSemIgual || "0");
  }

  $(".digito").on("click", function () {
    const digito = $(this).text();

    if (digito === "." && valorAtual.includes(".")) return;

    valorAtual += digito;

    if (valorAnterior !== null && operacaoAtual) {
      atualizarDisplay(`${valorAnterior} ${operacaoAtual} ${valorAtual}`);
    } else {
      atualizarDisplay(valorAtual);
    }
  });

  $(".operacao").on("click", function () {
    const operacao = $(this).text();

    if (operacao === "=") {
      if (
        valorAnterior !== null &&
        operacaoAtual !== null &&
        valorAtual !== ""
      ) {
        const resultado = calcular(
          valorAnterior,
          operacaoAtual,
          parseFloat(valorAtual)
        );

        atualizarDisplay(`${resultado}`);

        valorAnterior = resultado;
        operacaoAtual = null;
        valorAtual = "";
      }
    } else if (operacao === "C") {
      valorAtual = "";
      valorAnterior = null;
      operacaoAtual = null;
      atualizarDisplay("0");
    } else {
      if (valorAtual !== "") {
        if (valorAnterior === null) {
          valorAnterior = parseFloat(valorAtual);
        } else {
          valorAnterior = calcular(
            valorAnterior,
            operacaoAtual,
            parseFloat(valorAtual)
          );
        }
        operacaoAtual = operacao;
        valorAtual = "";
        atualizarDisplay(`${valorAnterior} ${operacaoAtual}`);
      }
    }
  });

  function calcular(valor1, operador, valor2) {
    switch (operador) {
      case "+":
        return valor1 + valor2;
      case "-":
        return valor1 - valor2;
      case "*":
        return valor1 * valor2;
      case "/":
        return valor2 !== 0 ? valor1 / valor2 : "Erro";
      default:
        return valor2;
    }
  }

  $(document).on("keydown", function (e) {
    const tecla = e.key;

    if (/^\d$/.test(tecla)) {
      $(".digito:contains(" + tecla + ")").click();
    } else if (tecla === "." || tecla === ",") {
      if (valorAtual.includes(".")) return;
      $(".operacao:contains(.)").click();
    } else if (
      tecla === "+" ||
      tecla === "-" ||
      tecla === "*" ||
      tecla === "/"
    ) {
      $(".operacao:contains(" + tecla + ")").click();
    } else if (tecla === "=" || tecla === "Enter") {
      $(".operacao:contains(=)").click();
    } else if (tecla === "Escape") {
      $(".operacao:contains(C)").click();
    }
  });
});
