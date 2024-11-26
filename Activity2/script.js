const addButton = document.getElementById("add");
const pasaLoad = document.querySelector(".pasaload");
const mobileNumber = document.querySelectorAll("mobile");
const btnLoad = document.getElementById("btnLoad");
const addAmount = document.getElementById("addAmount");
const addBalanceModal = document.getElementById("addBalanceModal"); // modal container

addAmount.addEventListener("click", function () {
  var myModal = new bootstrap.Modal(addBalanceModal);
  myModal.show();
});
function addBalanceSection() {
  addButton.addEventListener("click", function () {
    const balance = document.getElementById("balance");
    const amount1 = document.getElementById("amount1").value;

    // Validate the input amount
    if (amount1 === "" || isNaN(amount1) || parseFloat(amount1) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    const myModal = bootstrap.Modal.getInstance(addBalanceModal);
    myModal.hide();
    const currentBalance = parseFloat(balance.value) || 0;
    const newBalance = currentBalance + parseFloat(amount1);
    balance.value = newBalance.toFixed(2);
    alert("Successfully Added");
  });
}

addBalanceSection();

function pasaloadSection() {
  btnLoad.addEventListener("click", function () {
    const balanceElement = document.getElementById("balance");
    let balance = parseFloat(balanceElement.value);
    const mobile = document.getElementById("mobile").value;
    const amount2 = parseFloat(document.getElementById("amount2").value);
    if (mobile === "") {
      alert("Please enter a valid mobile number");
      return;
    }
    if (isNaN(amount2) || amount2 === 0) {
      alert("Please input a valid Amount");
      return;
    }

    if (amount2 > balance) {
      alert("Insufficient balance");
    } else if (amount2 <= balance) {
      const result = balance - amount2;
      console.log(result);

      balanceElement.value = result.toFixed(2);
      document.getElementById("balance").innerText = result.toFixed(2);
      alert("Transaction Successful!");
      const transaction = `PasaLoad of ${amount2} was successful on ${mobile}. New balance: ${result.toFixed(
        2
      )}`;
      addTransactionToHistory(transaction);
    } else {
      alert("Insufficient balance");
    }
  });
}
pasaloadSection();

let transactionList = [];
function addTransactionToHistory(transaction) {
  transactionList.push(transaction);

  const historyList = document.getElementById("history-list");
  const listItem = document.createElement("li");
  listItem.textContent = transaction;
  historyList.appendChild(listItem);
}
