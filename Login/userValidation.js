const url = 'http://localhost:3000/users';

const passwordForm = document.getElementById('password').value;
const emailForm = document.getElementById('email').value;
const loginBtn = document.getElementById('loginBtn')


loginBtn.addEventListener('click',userValidation())

async function userValidation(){
    try{
        const users = await fetch(url);
        const usersData = await users.json();
    
        console.log(usersData);

        usersData.forEach(element => {
            console.log(element.email)
            
        });

    }
    catch{}
}

