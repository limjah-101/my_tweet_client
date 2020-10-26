
//<<<<<<<<<<<<<< <<LOG IN METHODS >>>>>>>>>>>>>>>>

export const login = user => {
    return fetch(`${process.env.REACT_APP_API_URI}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then( res => {            
            return res.json();
        })
        .catch( err => console.log(err));
}

export const isLogedIn = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("lemur_zone_jwt", JSON.stringify(jwt));
        next();
    }          
}

//<<<<<<<<<<<<<<< REGISTER METHODS >>>>>>>>>>>>>>>>>

export const register = user => {
    return fetch(`${process.env.REACT_APP_API_URI}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( res => {             
        return res.json() 
    })
    .catch( err => console.log(err));
}

//<<<<<<<<<<<<<<<<<<< LOG OUT >>>>>>>>>>>>>>>>>>>

export const logout = (next) => {
    
    if (typeof window !== "undefined"){
        localStorage.removeItem('lemur_zone_jwt');
        next();
        return fetch(`${process.env.REACT_APP_API_URI}/logout`, {
            method: "GET",            
        })
        .then(res => {            
            return res.json()
        }) 
        .then(res => console.log(res))       
        .catch(err => console.log(err))
    }
}


export const isAuthenticated = () => {
    if (typeof window === "undefined"){
        return false;
    }
    if (localStorage.getItem('lemur_zone_jwt')) {
        return JSON.parse(localStorage.getItem('lemur_zone_jwt'));
    } else {
        return false;
    }
}

//<<<<<<<<<<<<<<<<<<<<< DELETE ACCOUNT >>>>>>>>>>>>>>>

export const deleteAccount = (token, userId) => {
    return fetch(`${process.env.REACT_APP_API_URI}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    })
    .then( result => console.log(result))
    .catch(err => console.log(err.response))
}

//<<<<<<<<<<<<<<<<<<<<< LOGIN GOOGLE CHECK AND REDIRECTION >>>>>>>>>>>>>>>>>>>>>>>>>>
export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('lemur_zone_jwt', JSON.stringify(jwt))
        next();
    }
}

//<<<<<<<<<<<<<<<<<<<<< GOGGLE LOGIN >>>>>>>>>>>>>>>>>>>>
export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URI}/social-login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};