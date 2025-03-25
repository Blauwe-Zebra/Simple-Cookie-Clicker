// Variabelen delcareren
let Cookies = localStorage.getItem("Cookies");
let CookieClickWorth = localStorage.getItem("CookieClickWorth");
let PassiveCursor = localStorage.getItem("PassiveCursor");
let PassiveCursorPrice = localStorage.getItem("PassiveCursorPrice");

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

// Funtie om een cursorupgrade item te genereren bij start
CreateCursorUpgradeBegin();
function CreateCursorUpgradeBegin() {
  const container = document.getElementById("CursorUpgrade");

  for (let TellerCUP = 1; TellerCUP <= 4; TellerCUP++) {
    const section = document.createElement("section");
    section.id = "CursorUpgradeC" + TellerCUP;

    section.onclick = ((index) => () => {
      CursorUpgradeClick(index);
      console.log(index);
    })(TellerCUP); // Sluitingsprobleem opgelost

    const img = document.createElement("img");
    img.src = "Assets/Images/Cursor.jpg";
    img.alt = "CursorUpgrade";

    const p = document.createElement("p");
    const prijzen = [100, 200, 500, 1000]; // Voeg hier extra prijzen toe indien nodig
    p.innerHTML = TellerCUP <= prijzen.length ? prijzen[TellerCUP - 1] : "???";

    const span = document.createElement("span");
    span.textContent = "x" + (TellerCUP + 1);

    section.append(img, p, span);
    container.appendChild(section);
  }
}

// Functie om knoppen inactief te maken als gekocht
CursorUpgradeClickInactive();
function CursorUpgradeClickInactive() {
  for (let i = 1; i <= CookieClickWorth - 1; i++) {
    removeCursorUpgrade(i);
  }
}

// Functie die kijkt voor de cursor upgrade
function CursorUpgradeClick(CursorUpgradeClick) {
  if (CursorUpgradeClick == 1) {
    if (Cookies >= 100) {
      Cookies = Cookies - 100;
      CookieClickWorth = 2;
      removeCursorUpgrade(CursorUpgradeClick);
    } else {
      Message("Niet genoeg geld");
    }
  } else if (CursorUpgradeClick == 2) {
    if (Cookies >= 200) {
      Cookies = Cookies - 200;
      CookieClickWorth = 3;
      removeCursorUpgrade(CursorUpgradeClick);
    } else {
      Message("Niet genoeg geld");
    }
  } else if (CursorUpgradeClick == 3) {
    if (Cookies >= 500) {
      Cookies = Cookies - 500;
      CookieClickWorth = 4;
      removeCursorUpgrade(CursorUpgradeClick);
    } else {
      Message("Niet genoeg geld");
    }
  } else if (CursorUpgradeClick == 4) {
    if (Cookies >= 1000) {
      Cookies = Cookies - 1000;
      CookieClickWorth = 5;
      removeCursorUpgrade(CursorUpgradeClick);
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

// funtie om cursorupgrade item te removen
function removeCursorUpgrade(CursorUpgradeClickR) {
  const section = document.getElementById(
    "CursorUpgradeC" + CursorUpgradeClickR
  );
  if (section) {
    section.remove();
    createCursorUpgrade(CursorUpgradeClickR + 1);
  }
}

// Funtie om een cursorupgrade item te genereren
function createCursorUpgrade(CursorUpgradeClickR) {
  const section = document.createElement("section");
  section.id = "CursorUpgradeC" + CursorUpgradeClickR + 5;
  section.onclick = function () {
    CursorUpgradeClick(CursorUpgradeClickR + 4);
  };

  const img = document.createElement("img");
  img.src = "Assets/Images/Cursor.jpg";
  img.alt = "CursorUpgrade" + (CursorUpgradeClickR + 4);

  const p = document.createElement("p");
  p.innerHTML = "2&nbsp;000";

  const span = document.createElement("span");
  span.textContent = "x" + (CursorUpgradeClickR + 4);

  section.appendChild(img);
  section.appendChild(p);
  section.appendChild(span);

  document.getElementById("CursorUpgrade").appendChild(section); // Voeg toe aan de body of een specifieke container
}

// Passive cursor upgrade
PassiveCursorPriceF();
function PassiveCursorPriceF() {
  if (PassiveCursor == 0) {
    PassiveCursorPrice = 30;
  } else if (PassiveCursor == 1) {
    PassiveCursorPrice = 50;
  } else if (PassiveCursor == 2) {
    PassiveCursorPrice = 100;
  } else if (PassiveCursor == 3) {
    PassiveCursorPrice = 200;
  } else {
    PassiveCursorPrice = parseInt(PassiveCursor * 100);
  }
  document.getElementById("PassiveCursorPriceP").textContent =
    PassiveCursorPrice + " cookies";
  document.getElementById("PassiveCursorLevel").textContent = PassiveCursor;
  localStorage.setItem("PassiveCursorPrice", PassiveCursorPrice);

  CookiesLog.textContent =
    "Cursor upgrade = " +
    PassiveCursor +
    "\nYou get " +
    PassiveCursor +
    " Cookies every second";
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
    CookieUpdate();
    PassiveCursorPriceF();
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
  }, 6000);
}
