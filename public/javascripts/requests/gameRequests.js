async function getBoard() {
    try {
        const response = await fetch(`/api/board`);
        if (response.status == 200) {
           var board = await response.json();
           return board;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getGameBits() {
    try {
        const response = await fetch(`/api/board/gamebits`);
        if (response.status == 200) {
           var gamebits = await response.json();
           return gamebits;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}