
var names = ["Hamburger", "Fries", "Coke", "Pepsi"];
var prices = [200, 100, 50, 50];
var quantities = [0, 0, 0, 0];


function showPage(page) {
  document.getElementById("register-page").style.display = "none";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("welcome-page").style.display = "none";
  document.getElementById("menu-page").style.display = "none";
  document.getElementById("checkout-page").style.display = "none";

  if (page === "register" || page === "login") {
    document.getElementById(page + "-page").style.display = "flex";
    document.getElementById("auth-navbar").style.display = "flex";
    document.getElementById("app-navbar").style.display = "none";
  } else {
    document.getElementById(page + "-page").style.display = "block";
    document.getElementById("auth-navbar").style.display = "none";
    document.getElementById("app-navbar").style.display = "flex";
  }
}

// Form submit action
function goToLogin(event) {
  event.preventDefault();
  showPage("login");
}

function goToWelcome(event) {
  event.preventDefault();
  showPage("welcome");
}

// Add or remove
function updateItem(index, change) {
  if (quantities[index] + change >= 0) {
    quantities[index] = quantities[index] + change;
  }

  //update card

  var qty = quantities[index];
  var infoBox = document.getElementById("info-" + index);
  var minusBtn = document.getElementById("minus-" + index);

  if (qty > 0) {
    infoBox.style.display = "block";
    document.getElementById("qty-" + index).innerText = qty;
    document.getElementById("cost-" + index).innerText = qty * prices[index];
    minusBtn.className = "action-btn btn-minus-active";
  } else {
    infoBox.style.display = "none";
    minusBtn.className = "action-btn btn-minus-disabled";
  }

  //Count item
  var itemCount = 0;
  for (var i = 0; i < 4; i++) {
    if (quantities[i] > 0) {
      itemCount = itemCount + 1;
    }
  }

  var cartWidget = document.getElementById("cart-widget");
  if (itemCount > 0) {
    cartWidget.style.display = "flex";
    document.getElementById("cart-badge").innerText = itemCount;
  } else {
    cartWidget.style.display = "none";
  }

  // Update modal if it is currently open
  if (document.getElementById("modal-overlay").style.display === "flex") {
    openModal();
  }
}

//open order summary
function openModal() {
  var modalItems = document.getElementById("modal-items");
  modalItems.innerHTML = "";
  var totalBill = 0;

  for (var i = 0; i < 4; i++) {
    if (quantities[i] > 0) {
      totalBill = totalBill + (quantities[i] * prices[i]);

      modalItems.innerHTML +=
        '<div class="modal-row">' +
          '<span>' + names[i] + ' :</span>' +
          '<span>' + quantities[i] + '</span>' +
          '<div class="modal-row-btns">' +
            '<button class="action-btn btn-plus" onclick="updateItem(' + i + ', 1)">+</button>' +
            '<button class="action-btn btn-minus-active" onclick="updateItem(' + i + ', -1)">&#8722;</button>' +
          '</div>' +
        '</div>';
    }
  }

  document.getElementById("modal-total-amount").innerText = totalBill;
  document.getElementById("modal-overlay").style.display = "flex";
}

//  close order summary
function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}

// save button
function checkoutOrder() {
  closeModal();
  document.getElementById("cart-widget").style.display = "none";
  showPage("checkout");
}