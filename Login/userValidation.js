const url = 'http://localhost:3000/users';

const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('error');
const showPassword = document.getElementById('showPassword');

let passRegEx = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/);
let emailRegEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

async function userValidation(email, password){
    try{
        const users = await fetch(url);
        const usersData = await users.json();
    
        datastring= JSON.stringify(usersData)

        usersData.forEach(user => {
            if (user.email === email) {
                console.log('matchea email')
                if (user.password === password) {
                    console.log('matchea pass')
                    if (document.getElementById('checkbox').checked) {
                        localStorage.setItem('logged', true);
                        window.location.assign('./home.html')
                    }
                    else {
                        sessionStorage.setItem('logged', true);
                        window.location.assign('./home.html')
                    }
                }
            }
            else { 
                errorMsg.textContent= 'Wrong email or password'
            }
        });
    }
    catch{(e)=>console.log('error',e)}
}

document.addEventListener('DOMContentLoaded', () => {
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');


    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        errorMsg.textContent =''
        
        let error = 0;
        let emailValue = email.value;
        let passwordValue = password.value;

        if (passwordValue === '') {
            errorMsg.textContent = "Password can't be empty";
            error++;
        } else if (passRegEx.test(passwordValue)) {
        } else {
            errorMsg.textContent = 'Please enter a valid password' 
            error++;
        }

        if (emailRegEx.test(emailValue)) {

        } else {
            errorMsg.textContent = 'Please enter a valid email';
            error++;
        }
        if (error === 0) {
            userValidation(emailValue, passwordValue);
        }
        
    })
    
})

showPassword.addEventListener('click', () => {
    
    const passwordInput = document.getElementById('password')
    const attribute = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordInput.setAttribute('type', attribute);

})
