
const logOut = document.getElementById('logOut')

logOut.addEventListener('click', (e) => {
    // prevent default submition
    sessionStorage.removeItem("logged");
    localStorage.removeItem("logged");
})