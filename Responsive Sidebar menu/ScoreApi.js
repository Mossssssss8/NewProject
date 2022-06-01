
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

async function addScoreTable(ScoreModel) {
    const ScoreApi = `http://localhost:3000/score/`

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
    var {data} = await response.json()
    console.log("get in DB")
    return data
}

function CountScoreByNameEx(AllScore, nameEx) {
    var Score = 0
    AllScore.forEach(S => {
        if (S.NameEx == nameEx) {
            Score += S.Score
        }
    });
    return Score
}

async function plusScore(nameEx){
    var user = GetUser()
    var model = new ScoreModel()
    model.UserId = user._id
    model.NameEx = nameEx.toLowerCase();
    model.DateTime = new Date();
    model.Score = 1;
    await addScoreTable(model)
}
function GetUser() {
    // console.log(localStorage.getItem("User_Ex"))
    return JSON.parse(localStorage.getItem("User_Ex"))
}