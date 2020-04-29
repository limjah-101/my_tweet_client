import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { login, isLogedIn } from '../auth';
import styles from './User.module.css';

import Spinner from '../components/loading/Spinner';

import SocialLogin from './SocialLogin';

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
    
    renderForm = (email, password) => {
        return(            
            <div className={styles.login__form}>
                <h5 className={styles.login__formHeader}>Sign In</h5>
                
                { this.displayErrors() }
                <form onSubmit={ this.handleFormSubmit }>
                    
                    <div className="form-group">
                        <label htmlFor="email" className="text-muted">Your Email</label>
                        <input 
                            onChange={this.handleInputChange('email')} 
                            type="email" name="email" 
                            className="form-control"
                            value={ email }
                            autoComplete="off"
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="text-muted">Your Password</label>
                        <input 
                            onChange={this.handleInputChange('password')} 
                            type="password" name="password" 
                            className="form-control"
                            value={ password }
                            autoComplete="off"
                            />                        
                    </div>
                    <div className={styles.googlebtn}>
                        <SocialLogin />
                    </div>
                    <button className="btn btn-block btn-outline-secondary">SIGN IN</button>
                </form>
                <p className="mt-3">
                    <small className="text-muted">Not already have an account ? Please  
                        <Link to="/register" className="text-secondary"> Sign Up</Link>
                    </small>
                </p>
            </div>        
        )
    }

    displayErrors = () => {        
        if (this.state.error) {
            return(
                <div className={styles.errorMsg}>
                    <span >{ this.state.error }</span>
                </div>
            ) 
        }       
    }
    
    render() { 
        let { email, password, redirectToReferer, loading } = this.state;
        
        if ( redirectToReferer ) {
            return < Redirect to="/home" />
        }
        return ( 
            <div className={`container-fluid ${styles.section__login}`}>                
                { loading ? <Spinner /> : this.renderForm(email, password) }                
            </div>
            
        );
    }
}
 
export default Login;