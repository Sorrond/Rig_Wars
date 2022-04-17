async function loginUser() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let result = await login(name, password);
        if (result.logged) {
            window.location = "rooms.html"
        } else {
            document.getElementById("result").innerHTML = "Wrong username or password";
        }
    } catch (err) {
        console.log(err)
    }
}

function CheckLogin(){
	let username = 'Sorrond'

	if(username == 'Sorrond'){
		alert(`Welcome Master ${username} we have been waiting.`)

		screen_LoginTrue()
		
	}else{
		let name = 'Zoro'
		alert(`That's not a real sammurai I've read this story a million times that i know it all and ${name} is not the real Shogun.`)
	}
}