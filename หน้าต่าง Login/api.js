// เพิ่มการกด Enter ใน Tag button
var passwordInput = document.getElementById("passwordForLogin");
passwordInput.addEventListener("keyup", function(event) {
    console.log(event)
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("Login_Btn").click();
    }
  });
//

const UserApi = "http://localhost:3000/user/"
async function UserRegister() {
    var modeluser = {}
    modeluser.username = document.getElementById("users").value
    modeluser.age = document.getElementById("age").value
    modeluser.gender = document.getElementById("Gender").value
    modeluser.Height = document.getElementById("Height").value
    modeluser.Weight = document.getElementById("Weight").value
    modeluser.email = document.getElementById("email").value
    modeluser.password = document.getElementById("password").value
    console.log(modeluser)
    const response = await fetch(UserApi + "add", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modeluser)

    })
    return response.json()
}
async function getAllUser() {
    var response = await fetch(UserApi, {
        method: 'GET',

    })
    var allUSer = await response.json()
    console.log(allUSer)
    return response.json()
}
async function login() {
    var modeluser = {
        username: document.getElementById("usernameForLogin").value,
        password: document.getElementById("passwordForLogin").value
    }
    console.log(modeluser)
    var response = await fetch(UserApi + "login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modeluser)
    })
    var res = await response.json()
    if (res) {
        //ถ้า Login สำเร็จ
        console.log(res)
        alert("Alert")
        location.href = "../Responsive Sidebar menu/index.html"
    } else {
        Swal.fire(
            'Invalid Username or Password!!!',
            '',
            'error'
        )
        document.getElementById("passwordForLogin").value = "";
    }

    return res
}