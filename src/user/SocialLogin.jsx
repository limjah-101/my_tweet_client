import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";
import './Login/login.scss';
 
class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }
 
    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        console.log("user obj to social login: ", user);
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };
    
 
    render() {
        // redirect        
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
 
        return (
            <GoogleLogin
                clientId="1079539042456-52jmqpbn4246n7ic9lrobvdsjgu4jf92.apps.googleusercontent.com"
                render={renderProps => (
                    <button className="btn__google" onClick={renderProps.onClick}>Se connecter avec Google</button>
                )}
                // buttonText="Se connecter avec Google"
                onSuccess={ this.responseGoogle }
                onFailure={ this.responseGoogle }                              
            />
        );
    }
}
 
export default SocialLogin;