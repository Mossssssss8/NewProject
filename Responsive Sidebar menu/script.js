let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

const UserApi = "http://localhost:3000/user/"
var User = {}; // จะมีค่าเพราะ Function init
closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}

function GetUser_id(){
  console.log(localStorage.getItem("User_Ex"))
}

function init(){
  const user = localStorage.getItem("User_Ex");
  console.log(user)
  if(isEmpty(user)){
    
    var GuestUser = {
      username : "guest"
    }
    localStorage.setItem("User_Ex",JSON.stringify(GuestUser))
    User = GuestUser
    
  }else{
    User = JSON.parse(user)
  }
  
    document.getElementById("ShowUserName").innerHTML =  User.username;
}

function logout(){
  Swal.fire({
    title: 'Do you want to logout?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `No`,
    icon:"question"
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.setItem("User_Ex","")
      location.href = "../หน้าต่าง Login/index.html"
    } else if (result.isDenied) {
      
    }
  })
  
  
}

function isEmpty(str){
  return (!str || str.length === 0 );
}

function alertMessage(){

}