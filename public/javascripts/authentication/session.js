async function logoutUser() {
    try {
        let result = await logout();
        window.location = "index.html"
    } catch (err) {
        console.log(err);
    }
}

async function getUserInfo() {
    try {
        let result = await requestUserInfo();
        if (result.logged) {
           return result.result;
        } else {
            alert ("You are not logged in\nwe will send you back to the main page");
            window.location = "index.html"
        }
    } catch(err) {
        console.log(err);
    }
}