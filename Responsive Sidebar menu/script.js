let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

const UserApi = "http://localhost:3000/user/"
var User = {}; // จะมีค่าเพราะ Function init
closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
});

searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
}

function GetUser_id() {
    // console.log(localStorage.getItem("User_Ex"))
    return JSON.parse(localStorage.getItem("User_Ex"))
}

async function getUserByid(userid) {
    var response = await fetch(UserApi + "get/" + userid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(modeluser)
    })
    var res = await response.json()

    localStorage.setItem("User_Ex", JSON.stringify(res.data))

}
async function init() {
    const user = localStorage.getItem("User_Ex");
    var userjson = JSON.parse(user)
    getUserByid(userjson._id)
    console.log(user)
    console.log(location.search)
    if (location.search.includes("LoginSucessfully")) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
        })
    }
    if (isEmpty(user)) {

        Swal.fire(
            'Please Login',
            '',
            'warning'
        )
        await setTimeout(() => {
            location.href = "../หน้าต่าง Login/index.html"
        }, 1500);
        var GuestUser = {
            username: "Guest"
        }
        localStorage.setItem("User_Ex", JSON.stringify(GuestUser))
        User = GuestUser

    } else {
        User = JSON.parse(user)
    }

    document.getElementById("ShowUserName").innerHTML = User.username;
}

function logout() {
    Swal.fire({
        title: 'ต้องการออกจากหน้านี้ ?',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ตกลง',
        icon: "question"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            localStorage.setItem("User_Ex", "")
            location.href = "../หน้าต่าง Login/index.html"
        }
    })


}

function isEmpty(str) {
    return (!str || str.length === 0);
}

function alertMessage() {

}

function disabledLi(isOpen) {
    var a = document.querySelectorAll("li")
    a.forEach((i) => {
        if (!isOpen) {
            i.style.pointerEvents = "none"
            i.style.opacity = 0.6;
        }else{
            i.style.pointerEvents = ""
            i.style.opacity = 1;
        }

    })
}