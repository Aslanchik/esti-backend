import Dark from "./darkSer.js";

export const declareVE = () => {
  Dark.declareEvents();
  const loginBtn = document.querySelector("#login_btn");
  const registerBtn = document.querySelector("#register_btn");
  loginBtn.addEventListener("click", () => {
    Dark.openWindow("#id_dark_login");
  });
  registerBtn.addEventListener("click", () => {
    Dark.openWindow("#id_dark_register");
  });
};
