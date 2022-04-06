async function requestUserInfo() {
    try {
        const response = await fetch(`/api/users/profile`);
        var result = await response.json();
        return {logged: response.status!=401 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}