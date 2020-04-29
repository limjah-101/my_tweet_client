//CREATE NEW POST
export const createPost = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URI}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response =>  response.json())
    .catch( err => console.log(err));
}

// GET ALL POSTS
export const getAllPosts = () => {
    return fetch(`${process.env.REACT_APP_API_URI}/posts` ,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",            
        }
    })
    .then( response => response.json())
    .catch(err => console.log(err));
}

// GET ONE POST
export const getPost = postId => {
    return fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
        method: "GET"        
    })
    .then( response => response.json() )
    .catch(err => console.log(err))
}

// GET USERS POSTS
export const getUsersPosts = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URI}/posts/by/${userId}` ,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`           
        }
    })
    .then( response => response.json())
    .catch(err => console.log(err));
}

//DELETE POST
export const deletePost = (token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => {
        return res.json()
    })    
    .catch(err => console.log(err))
}

// UPDATE POST
export const updatePost = (postId, token, postData) => {
    
    return fetch(`${process.env.REACT_APP_API_URI}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json", -> Not working with image upload
            Authorization: `bearer ${token}`
        },
        body: postData
    }).then( response => response.json()).catch(err => console.log(err))        
}

// LIKE API REQUEST
export const like = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URI}/post/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
    .then( response => response.json())
    .catch(err => console.log(err));
}

// UNLIKE API REQUEST
export const unlike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URI}/post/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
    .then( response => response.json())
    .catch(err => console.log(err));
}

//COMMENT API REQUEST
export const comment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URI}/post/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
    .then( response => response.json())
    .catch(err => console.log(err));
}

//UNCOMMENT API REQUEST
export const uncomment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URI}/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
    .then( response => response.json())
    .catch(err => console.log(err));
}