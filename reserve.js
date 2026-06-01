const form = document.querySelector("#reserve-form");
const message = document.querySelector("#reserve-message");
const dateInput = form?.elements.date;
const whatsappNumber = "60199543513";

if (form) {
  form.noValidate = true;
}

const today = new Date();
const todayValue = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

if (dateInput) {
  dateInput.min = todayValue;
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name").toString().trim();
  const phone = data.get("phone").toString().trim();
  const party = data.get("party").toString();
  const date = data.get("date").toString();
  const time = data.get("time").toString();

  if (!name || !phone || !date) {
    message.textContent = "请填写姓名、电话号码和预订日期。";
    message.classList.add("is-error");
    return;
  }

  const whatsappText = [
    "你好，Wonderful 9，我想预订一张桌位。",
    `姓名：${name}`,
    `电话：${phone}`,
    `人数：${party}`,
    `日期：${date}`,
    `时间：${time}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  message.classList.remove("is-error");
  message.innerHTML = `正在为 ${name} 打开 WhatsApp，${party}，${date} ${time}。你也可以 <a href="tel:+60199543513">致电 +60 19-954 3513</a>。`;
  window.open(whatsappUrl, "_blank", "noopener");
  form.reset();
  dateInput.min = todayValue;
});
