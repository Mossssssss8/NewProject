
const ScoreApi = "http://localhost:3000/score/"


class ScoreModel {
    UserId = null
    NameEx = null
    Score = null
    DateTime = null
    Status = null
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

async function addLineInScoreDB(ScoreModel) {
    const ScoreApi = `http://localhost:3000/score/`
    ScoreModel.NameEx = ScoreModel.NameEx.toLowerCase();
    var response = await fetch(ScoreApi + "add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ScoreModel)
    })
    var res = await response.json()
    console.log("add in DB")
}

async function getScoreById(userId) {
    const ScoreApi = `http://localhost:3000/score/`

    var response = await fetch(ScoreApi + "get/" + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    var { data } = await response.json()
    console.log("get in DB")
    return data
}


function CountTimeByNameEx(AllScore, nameEx) {
    var time = 0
    AllScore.forEach(s => {
        if (s.NameEx.toLowerCase() == nameEx.toLowerCase()) {
            if (s.Seconds != null) {
                time = time + s.Seconds
            }
            // time = time + s.Seconds
        }
    });
    return time
}

function CountScoreByNameEx(AllScore, nameEx) {
    var Score = 0
    AllScore.forEach(S => {
        if (S.NameEx.toLowerCase() == nameEx.toLowerCase()) {
            Score += S.Score
        }
    });
    return Score
}

async function plusScore(nameEx) {
    var user = GetUser()
    var model = new ScoreModel()
    model.UserId = user._id
    model.NameEx = nameEx.toLowerCase();
    model.DateTime = new Date();
    model.Score = 1;
    await addLineInScoreDB(model)
}

function GetUser() {
    // console.log(localStorage.getItem("User_Ex"))
    return JSON.parse(localStorage.getItem("User_Ex"))
}

async function setScore() {
    var user = GetUser()
    console.log("Set Score")
    console.log(user._id)
    var AlluserScore = await getScoreById(user._id)
    console.log(AlluserScore)
    var Score = CountScoreByNameEx(AlluserScore, "squats")
    document.getElementById("showCounter").innerHTML = Score
    console.log("Set Score")
    init();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => { 
                toast.addEventListener('mouseenter', Swal.close)
            }
        })
        Toast.fire({
            icon: 'info',
            title: ' Notification : โปรดเลือกระดับความ ง่าย - ยาก ในการออกกำลังกาย',
            text :'',
            width:'700px'
        })
    

}
