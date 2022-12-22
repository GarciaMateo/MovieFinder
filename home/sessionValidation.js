const localToken = JSON.parse(localStorage.getItem('logged'))
const sessionToken = JSON.parse(sessionStorage.getItem('logged'))

if (localToken === null) {
    if (sessionToken === null) {
        window.location.assign('login.html')
    }
}