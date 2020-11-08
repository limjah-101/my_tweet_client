import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { login, isLogedIn } from '../../auth';
import './login.scss';

import Spinner from '../../components/loading/Spinner';

import SocialLogin from '../SocialLogin';

import signInIllustration from '../../assets/signin.png';
import logo from '../../assets/sz-logo.png';


import { MdLockOutline } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";



class Login extends Component {
    
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferer: false,
            loading: false
        }
    }

    handleInputChange = name => e => {
        this.setState({ [name]: e.target.value });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });

        let { email, password } =this.state;
        let user = { email, password };
        login(user)
            .then( data => {
                if(data.error) {
                    console.log(data)
                    this.setState({ error: data.error, loading: false })                    
                }else{
                    this.setState({
                        email: '',
                        password: '',
                        error: ''                        
                    })                    
                    isLogedIn(data, () => {
                        this.setState({ redirectToReferer: true });
                    });                    
                }
            }).catch(err => console.log(err.response))
    }
    
    // renderForm = (email, password) => {
    //     return(            
                   
    //     )
    // }

    displayErrors = () => {        
        if (this.state.error) {
            return(                
                    <span className="section__form-error">{ this.state.error }</span>                
            ) 
        }       
    }
    
    render() { 
        let { email, password, redirectToReferer, loading } = this.state;
        
        if ( redirectToReferer ) {
            return < Redirect to="/home" />
        }
        return ( 
           
            <section className="section">
                <div className="section__login">
                                        
                </div>

                <div className="section__form">
                    {/* { loading ? <Spinner /> : this.renderForm(email, password) }  */}
                    <div className="section__form-header">                        
                        <h3 className="">Se Connecter</h3>
                    </div> 
                    
                    <form onSubmit={ this.handleFormSubmit }>  
                                         
                        <div className="form-block">
                            {/* <label htmlFor="email" className="">Adresse email</label> */}
                            
                            <input 
                                onChange={this.handleInputChange('email')} 
                                type="email" name="email" 
                                className=""
                                value={ email }
                                autoComplete="off"
                                placeholder="Email"
                                />
                                {/* <span><MdMailOutline /></span> */}
                        </div>
                        { this.displayErrors() }

                        <div className="form-block">
                            {/* <label htmlFor="password" className="">Mot de passe</label> */}
                            <input 
                                onChange={this.handleInputChange('password')} 
                                type="password" name="password" 
                                className=""
                                value={ password }
                                autoComplete="off"
                                placeholder="Password"
                                />         
                                {/* <span><MdLockOutline /></span> */}
               
                        </div>

                        <div className="form-block">
                            <SocialLogin />
                        </div> 
                        
                        <div className="form-block">
                            <button className="">Se Connecter</button>
                        </div>
                    </form>
                    <div className="section__form-footer">                        
                        <p className="">Pas encore membre ? 
                            <Link to="/register" className=""> Créer un compte</Link>
                        </p>                                     
                    </div>
                </div>


            </section>
            
        );
    }
}
 
export default Login;