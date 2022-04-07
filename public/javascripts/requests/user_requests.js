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

async function login(name, password) {
    try {
        const response = await fetch(`/api/users/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ name: name, password: password}) 
        });
        var  result= await response.json();
        return {logged: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}
