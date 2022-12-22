const localToken = JSON.parse(localStorage.getItem('logged'))
const sessionToken = JSON.parse(sessionStorage.getItem('logged'))


if (localToken) {
    window.location.assign('./home.html')
}

if (sessionToken) {
    window.location.assign('./home.html')
}