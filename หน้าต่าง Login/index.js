//  const userId = document.getElementById('userId');
//  const gender = document.getElementById('firstName');
//  const age = document.getElementById('lastName');
//  const height = document.getElementById('age');
//  const addBtn = document.getElementById('addBtn');

// const database = firebase.database();

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    database.ref('/users/' + userId.value).set({
        first_name: firstName.value,
        last_name: lastName.value,
        age: age.value
    });
});