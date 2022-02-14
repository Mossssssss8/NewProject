const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

function loginWithGuest() {
    var GuestUser = {
        username: "Guest",
        gender: "?",
        age: 0,
        email: "?",
        Weight: "0",
        Height: "0",
    }
    localStorage.setItem("User_Ex", JSON.stringify(GuestUser))
    location.href = "../Responsive Sidebar menu/index.html"
}

function init() {
    localStorage.setItem("User_Ex", "");
}