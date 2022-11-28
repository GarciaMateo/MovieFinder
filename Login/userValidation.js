
const url = 'http://localhost:3000/user';

function userValidation(email, password) { 
    const passwordForm = document.getElementById('password').value;
    const emailForm = document.getElementById('email').value;


}


function login(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
    })

}