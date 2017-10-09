$(document).ready(function () {
  let $result = $("#result");
  let total = null;
  let next = null;
  let operation = null;

  function isDigit(num) {
    return num.match(/[0-9]/);
  }

  function operate(numOne, numTwo, operation) {
    numOne = Number(numOne);
    numTwo = Number(numTwo);
    switch (operation) {
      case "+":
        return (numOne + numTwo).toString();
      case "-":
        return (numOne - numTwo).toString();
      case "x":
        return (numOne * numTwo).toString();
      case "÷":
        return (numOne / numTwo).toString();
    }
  }

  function updateResult() {
    if (next) {
      $result.text(next);
    } else if (total) {
      $result.text(total);
    } else {
      $result.text("0");
    }
  }

  $(".button").click(function () {
    let button = $(this).text();

    if (button === "AC") {
      total = null;
      next = null;
      operation = null;
      updateResult();
    } else if (isDigit(button)) {
      if (button === "0" && next === null) {
        return;
      }
      if (operation) {
        if (next) {
          next = next + button;
          updateResult();
          return;
        }
        next = button;
        updateResult();
        return;
      }
      if (next) {
        next = next + button;
        total = null;
        updateResult();
        return;
      }
      next = button;
      total = null;
      updateResult();
    } else if (button === ".") {
      if (next) {
        if (next.includes(".")) {
          return;
        }
        next = next + ".";
        updateResult();
        return;
      }
      if (operation) {
        next = "0.";
        updateResult();
        return;
      }
      if (total) {
        if (total.includes(".")) {
          return;
        }
        total = total + ".";
        updateResult();
        return;
      }
      total = "0.";
      updateResult();
    } else if (button === "=") {
      if (next && operation) {
        total = operate(total, next, operation);
        next = total;
        operation = null;
        updateResult();
      }
    } else if (button === "+" || button === "-" || button === "x" || button === "÷") {
      if (operation) {
        total = operate(total, next, operation);
        next = null;
        operation = button;
        updateResult();
      }
      if (!next) {
        operation = button;
        return;
      }
      total = next;
      next = null;
      operation = button;
    }
  });
})
;