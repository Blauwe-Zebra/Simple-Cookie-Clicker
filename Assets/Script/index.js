// Variabelen delcareren
let Cookies = localStorage.getItem("Cookies");
let CookieClickWorth = localStorage.getItem("CookieClickWorth");
let PassiveCursor = localStorage.getItem("PassiveCursor");
let PassiveCursorPrice;

// Cookies aanmaken als ze nog nietz bestaan
if (Cookies == null) {
  localStorage.setItem("Cookies", 0);
  Cookies = 0;
}
if (CookieClickWorth == null || CookieClickWorth == 0) {
  localStorage.setItem("CookieClickWorth", 1);
  CookieClickWorth = 1;
}
if (PassiveCursor == null) {
  localStorage.setItem("PassiveCursor", 0);
  PassiveCursor = 0;
}

// Cookies tonen
CookieUpdate();

// Functie als er wordt geklikt op het koekje
function CookieClick() {
  Cookies = parseInt(Cookies) + parseInt(CookieClickWorth);
  CookieUpdate();
}

// Update het aantal cookies
function CookieUpdate() {
  document.getElementById("CookieCount").textContent = Cookies + " Cookies";
  localStorage.setItem("Cookies", Cookies);
  PassiveCursorPriceAfford();
}

// Functie om knoppen inactief te maken als gekocht
CursorUpgradeClickInactive();
function CursorUpgradeClickInactive() {
  for (let i = 1; i <= CookieClickWorth - 1; i++) {
    document.getElementById("CursorUpgradeC" + i).classList.add("Unlocked");
    document.getElementById("CursorUpgradeC" + i).onclick =
      "Message('Uw heeft deze upgrade al!')";
    console.log(i);
  }
}

// Functie die kijkt voor de cursor upgrade
function CursorUpgradeClick(CursorUpgradeClick) {
  if (CursorUpgradeClick == 1) {
    if (Cookies >= 100) {
      Cookies = Cookies - 100;
      CookieClickWorth = 2;
    } else {
      Message("Niet genoeg geld");
    }
  } else if (CursorUpgradeClick == 2) {
    if (Cookies >= 200) {
      Cookies = Cookies - 200;
      CookieClickWorth = 3;
    } else {
      Message("Niet genoeg geld");
    }
  } else if (CursorUpgradeClick == 3) {
    if (Cookies >= 500) {
      Cookies = Cookies - 500;
      CookieClickWorth = 4;
    } else {
      Message("Niet genoeg geld");
    }
  } else if (CursorUpgradeClick == 4) {
    if (Cookies >= 1000) {
      Cookies = Cookies - 1000;
      CookieClickWorth = 5;
    } else {
      Message("Niet genoeg geld");
    }
  } else {
    console.error("No upgrade possible");
  }
  localStorage.setItem("CookieClickWorth", CookieClickWorth);
  CursorUpgradeClickInactive();
  CookieUpdate();
}

// Passive cursor upgrade
PassiveCursorPriceF();
function PassiveCursorPriceF() {
  if (PassiveCursor == 0) {
    PassiveCursorPrice = 100;
  } else if (PassiveCursor == 1) {
    PassiveCursorPrice = 200;
  } else if (PassiveCursor == 2) {
    PassiveCursorPrice == 500;
  }
  document.getElementById("PassiveCursorPriceP").textContent =
    PassiveCursorPrice + " cookies";
}

PassiveCursorPriceAfford();
function PassiveCursorPriceAfford() {
  if (PassiveCursorPrice <= Cookies) {
    document.getElementById("PassiveCursorPriceP").style.color = "green";
  } else {
    document.getElementById("PassiveCursorPriceP").style.color = "red";
  }
}

function PassiveCursorUpgrade() {
  if (Cookies >= PassiveCursorPrice) {
    Cookies = Cookies - PassiveCursorPrice;
    PassiveCursor++;
    localStorage.setItem("PassiveCursor", PassiveCursor);
    PassiveCursorPriceF();
    PassiveCursorPriceAfford();
  } else {
    Message("Niet genoeg geld");
  }
}

// Kijkt om de 3 seconde of er een cursor upgrade is
function ThreeSeconds() {
  Cookies = parseInt(Cookies) + parseInt(PassiveCursor);
  CookieUpdate();
}

// Reset
function Reset() {
  localStorage.setItem("Cookies", 0);
  localStorage.setItem("CookieClickWorth", 1);
  localStorage.setItem("PassiveCursor", 0);
  window.location.reload();
}

// Pop-up Message
function Message(Message) {
  document.getElementById("MessageHead").textContent = Message;
  if (Message == "Niet genoeg geld") {
    document.getElementById("MessageDescription").textContent =
      "U heeft niet genoeg cookies om deze upgrade te kopen";
  }

  document.getElementById("Message").style.animation = "normal Message 7s";
  setTimeout(function () {
    document.getElementById("Message").style.animation = "none";
  }, 7000);
}
