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
    location.href = "../Responsive Sidebar menu/Set-mode.html"
}

function init() {
    localStorage.setItem("User_Ex", "");
}

Swal.fire({
    title: title,
    // text: `ต้องผ่านภายใน 10 นาที  ทุกท่าทาง 8 ครั้ง / 1 เซต`,
    html: html,
    icon: 'question',
    iconHtml: '?',
    confirmButtonText: 'ตกลง',
    // showCancelButton: true,
    showCloseButton: false
}).then((result) => {
    camerastart();
    document.getElementById("TimeBTN").style.display = "block"
    SelectedMode(Mode)
})
timeleft = 0;