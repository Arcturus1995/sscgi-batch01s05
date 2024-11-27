const addButton = document.getElementById("add");
const pasaLoad = document.querySelector(".pasaload");
const mobileNumber = document.querySelectorAll("mobile");
const btnLoad = document.getElementById("btnLoad");
const addAmount = document.getElementById("addAmount");
const addBalanceModal = document.getElementById("addBalanceModal"); // modal container
const verification = document.getElementById("verify");

function logout() {
  const passLoadForm = document.getElementById("passLoadForm1");
  const login = document.getElementById("login");

  const logoutButton = document.getElementById("logout1");

  logoutButton.addEventListener("click", function () {
    if (passLoadForm && login) {
      passLoadForm.style.display = "none";
      login.style.display = "block";
    } else {
      console.error("Required elements not found in the DOM.");
    }
  });
}

function logIn() {
  const submit = document.getElementById("submit");
  if (submit) {
    submit.addEventListener("click", function () {
      let username = document.getElementById("username").value.trim();
      let password = document.getElementById("password").value.trim();
      const passLoadForm = document.getElementById("passLoadForm1");
      const login = document.getElementById("login");

      const form = document.getElementById("loginForm");
      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => console.log(data));

      if (username === "" || password === "") {
        alert("Please enter both username and password");
      } else {
        if (username === "admin" && password === "admin") {
          if (passLoadForm && login) {
            login.style.display = "none";
            passLoadForm.style.display = "block";
          } else {
            console.error("Required elements not found in the DOM.");
          }
        } else {
          alert("Invalid username or password");
        }
      }
    });
  }
}

logIn();
logout();
function verificationAdmin() {
  const verify1 = document.getElementById("verify1").value.trim();
  const verify2 = "admin";

  if (verify1 !== verify2 || verify1 === "") {
    alert("Invalid verification code");
  } else if (verify1 === verify2) {
    const amount1 = document.getElementById("amount1");
    amount1.disabled = false;
    alert("Verification successful! You can now enter the amount.");
    document.getElementById("verify1").value = "";
  }
}
document.getElementById("verify").addEventListener("click", verificationAdmin);

addAmount.addEventListener("click", function () {
  var myModal = new bootstrap.Modal(addBalanceModal);
  myModal.show();
});

function addBalanceSection() {
  addButton.addEventListener("click", function () {
    const balance = document.getElementById("balance");
    const amount1 = document.getElementById("amount1");
    const amount1Value = amount1.value;
    if (
      amount1Value === "" ||
      isNaN(amount1Value) ||
      parseFloat(amount1Value) <= 0
    ) {
      alert("Please enter a valid amount");
      return;
    }
    const myModal = bootstrap.Modal.getInstance(addBalanceModal);
    myModal.hide();
    const currentBalance = parseFloat(balance.value) || 0;
    const newBalance = currentBalance + parseFloat(amount1Value);
    balance.value = newBalance.toFixed(2);
    alert("Successfully Added");

    const transaction = `Successfully added ${amount1Value} to balance. New balance: ${newBalance.toFixed(
      2
    )}`;
    addTransactionToHistory(transaction);
    amount1.disabled = true;
    amount1 = document.getElementById("amount1").value = "";
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
    document.getElementById("mobile").value = "";
    document.getElementById("amount2").value = "";
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
