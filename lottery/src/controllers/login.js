const LOGIN_URL = "http://localhost:3001/authentication/login";

const userLogin = async ({email, password}) => {

    try{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({email, password})
        };
    
        const user = await fetch(LOGIN_URL, options).then(response => response.json()).then(response => {return response});
    
        return user
    }catch(err){
        console.log("An error occurred while trying to login the user");
        throw err;
    }
    
}

export {userLogin};
