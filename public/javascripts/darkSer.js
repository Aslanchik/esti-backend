//DARK WINDOW CLASS MANAGER
class Dark {
  //CLOSE DARK WINDOW
  static closeWindow(_id) {
    document.querySelector(_id).className = "d-none";
  }
  // OPEN DARK WINDOW
  static openWindow(_id) {
    document.querySelector(_id).className = "dark";
  }
  // DARK EVENT MANAGER
  static declareEvents() {
    //CLOSE BUTTONS
    const closeBtn = document.querySelector("#btn_dark_login_close");
    const closeRBtn = document.querySelector("#btn_dark_register_close");
    //REDIRECTION BUTTONS
    const loginRDarkBtn = document.querySelector("#login_register_dark_btn");
    const registerLDarkBtn = document.querySelector("#register_login_dark_btn");
    //CLOSE BUTTON EVENT LISTENERS
    closeBtn.addEventListener("click", () => {
      Dark.closeWindow("#id_dark_login");
    });
    closeRBtn.addEventListener("click", () => {
      Dark.closeWindow("#id_dark_register");
    });
    //REDIRECTION BUTTONS EVENT LISTENERS
    loginRDarkBtn.addEventListener("click", () => {
      Dark.closeWindow("#id_dark_register");
      Dark.openWindow("#id_dark_login");
    });
    registerLDarkBtn.addEventListener("click", () => {
      Dark.closeWindow("#id_dark_login");
      Dark.openWindow("#id_dark_register");
    });
  }
}
export default Dark;
