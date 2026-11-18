// ====== EDIT THESE ======
const CURRENCY = "₹";
const TARIFF = 8;            // price per unit (kWh) of electricity
const UNITS_PER_KW = 120;    // units one kW of panels makes per month
const COST_PER_KW = 55000;   // installed price per kW
const SOLAR_SHARE = 0.85;    // share of the bill solar removes
const EMAIL = "hello@brightwellsolar.example";
// ========================

const money = n => CURRENCY + Math.round(n).toLocaleString("en-IN");
const bill = document.getElementById("bill");

function calc() {
  const b = +bill.value;
  const kw = Math.max(1, Math.round((b / TARIFF / UNITS_PER_KW) * 2) / 2);
  const save = b * SOLAR_SHARE;
  const years = (kw * COST_PER_KW) / (save * 12);
  document.getElementById("bill-out").textContent = money(b);
  document.getElementById("r-size").textContent = kw + " kW";
  document.getElementById("r-save").textContent = money(save);
  document.getElementById("r-pay").textContent = years.toFixed(1) + " years";
}
bill.addEventListener("input", calc);
document.getElementById("calc").addEventListener("submit", e => e.preventDefault());
calc();

// Quote form: opens the visitor's email app with the details filled in
const form = document.getElementById("lead");
const msg = document.getElementById("lead-msg");
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(form);
  if (!d.get("name").trim() || !d.get("phone").trim()) {
    msg.textContent = "Please add your name and phone number.";
    return;
  }
  const body = `Name: ${d.get("name")}\nPhone: ${d.get("phone")}\nRoof: ${d.get("roof")}\n\n${d.get("msg")}`;
  msg.textContent = "Opening your email app to send the request…";
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(body)}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
