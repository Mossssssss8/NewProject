
if (document.getElementById("passwordForLogin") != null) {
    // เพิ่มการกด Enter ใน Tag button
    var passwordInput = document.getElementById("passwordForLogin");
    passwordInput.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("Login_Btn").click();
        }
    });
    //
}


const UserApi = "http://localhost:3000/user/"
async function UserRegister() {
    var modeluser = {}
    modeluser.username = document.getElementById("username").value
    modeluser.age = document.getElementById("age").value
    modeluser.gender = document.getElementById("gender").value
    modeluser.Height = document.getElementById("height").value
    modeluser.Weight = document.getElementById("weight").value
    modeluser.email = document.getElementById("email").value
    modeluser.password = document.getElementById("password").value
    console.log(modeluser)
    var alertRequire = [];
    !modeluser.username ? alertRequire.push("username") : "";
    !modeluser.password ? alertRequire.push("password") : "";
    !modeluser.email ? alertRequire.push("email") : "";
    !modeluser.age ? alertRequire.push("age") : "";
    !modeluser.gender ? alertRequire.push("gender") : "";
    !modeluser.Height ? alertRequire.push("Height") : "";
    !modeluser.Weight ? alertRequire.push("Weight") : "";
    var a = /^[0-9]+$/
    if (!a.test(modeluser.Height) || !a.test(modeluser.Weight) || modeluser.Height > 250 || modeluser.Height < 100 || modeluser.Weight > 500 || modeluser.Weight < 30) {
        Swal.fire(
            'กรุณาใส่ให้ถูกต้อง',
            '',
            'error'
        )
    }
    else {
        if (modeluser.password.length < 8) {
            Swal.fire(
                'กรุณาใช้รหัสผ่านไม่น้อยกว่า 8 ตัว',
                '',
                'warning'
            )
        } else {

            var alertText = "";
            if (alertRequire.length > 0) {
                alertRequire.forEach((element, index) => {
                    index != 0 ? alertText += ", " : "";
                    alertText += element;
                    console.log(index)
                })
                Swal.fire(
                    'Please Enter ' + alertText,
                    '',
                    'warning'
                )
            } else {
                const response = await fetch(UserApi + "add", {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(modeluser)
                })
                Swal.fire({
                    title: "Register Successfully",
                    confirmButtonText: 'OK',
                    icon: "success"
                }).then((result) => {
                    location.href = "./index.html"
                })
                return response.json()
            }
        }
    }


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
        localStorage.setItem("User_Ex", JSON.stringify(res.data))
        location.href = "../Responsive Sidebar menu/index.html?LoginSucessfully"
    } else {
        Swal.fire(
            'Invalid Username or Password!',
            '',
            'error'
        )
        document.getElementById("passwordForLogin").value = "";
    }

    return res
}

async function updateUser(user) {
    var response = await fetch(UserApi + `update/${user._id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user
    })
    var allUSer = await response.json()
    console.log(allUSer)
    return response.json()
}
async function ForgotPassword(user) {
    var response = await fetch(UserApi + `ForgotPassword`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    var newuser = await response.json()
    console.log(newuser)
    return newuser
}
