//<<<<<<<<<<<<<<<< GET USER PROFILE DATA >>>>>>>>>>>>>>>
export const getUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URI}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        }          
    }).then( response => response.json());
}

// Fetch All Users
export const getAllUsers = (token) => {
    return fetch(`${process.env.REACT_APP_API_URI}/users`, {
        method: "GET"        
    }).then( response => response.json() );
}

//<<<<<<<<<<<<<<<<<< UPDATE USER PROFILE >>>>>>>>>>>>>>>>>
export const updateUserProfile = (userId, token, formData) => {
    console.log("UPDATE", formData)
    return fetch(`${process.env.REACT_APP_API_URI}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json", -> Not working with image upload
            Authorization: `bearer ${token}`
        },
        body: formData
    }).then( response => response.json()).catch(err => console.log(err))        
}

//<<<<<<<<<<<<<<<<<<<<< EDIT PROFILE BACKGROUND IMAGE >>>>>>>>>>>>>>>>>>>>>>>
export const backgroundImageHandler = (userId, token, formData) => {
    return fetch(`${process.env.REACT_APP_API_URI}/user/backgroundPhoto/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        },
        body: formData
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}
export const getBackgroundImage = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URI}/user/backgroundPhoto/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        }          
    }).then( response => response.json());
}

//<<<<<<<<<<<<<<<<<<<< UPDATE LOCAL STORAGE USER INFOS >>>>>>>>>>>>>>>>>>>>>>>
export const userLocalStorage = (user, next) => {
    if (typeof window !== "undefined"){
        if (localStorage.getItem('lemur_zone_jwt')) {
            let auth = JSON.parse(localStorage.getItem('lemur_zone_jwt'));
            auth.user = user;
            localStorage.setItem('lemur_zone_jwt', JSON.stringify(auth));
            next();
        }
    }
}

//<<<<<<<<<<<<<<<<<<<<< HANDLE FOLLOW >>>>>>>>>>>>>>>>>>>>>>>>>
export const follow = (userId, token, followId) => {
    
    return fetch(`${process.env.REACT_APP_API_URI}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json", 
            Authorization: `bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
    .then( response => response.json())
    .catch(err => console.log(err))        
}

//<<<<<<<<<<<<<<<<<<<<< HANDLE UNFOLLOW >>>>>>>>>>>>>>>>>>>>>>>>>
export const unfollow = (userId, token, unfollowId) => {
    
    return fetch(`${process.env.REACT_APP_API_URI}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json", 
            Authorization: `bearer ${token}`
        },
        body: JSON.stringify({ userId, unfollowId })
    })
    .then( response => response.json())
    .catch(err => console.log(err))        
}

//<<<<<<<<<<<<<<<<<<< FIND PEOPLE TO FOLLOW >>>>>>>>>>>>>>>>>>>>> 
export const findPeople = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URI}/user/findpeople/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    }).catch( err => console.log(err))
}