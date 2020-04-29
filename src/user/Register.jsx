import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './User.module.css';

import { register } from '../auth';

class Register extends Component {
    
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            success: ''
        }
    }

    handleInputChange = name => e => {        
        this.setState({ [name]: e.target.value });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name: name,
            email: email,
            password: password
        }    
        register(user)
            .then( data => {
                if (data.error) {
                    this.setState({ error: data.error })
                }else {
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: data.message
                    })
                }
            });                
    }
    
    renderForm = (name, email, password) => {
        return(
            <div className={`container-fluid ${styles.section__register}`}>
                <div className={styles.register__form}>
                    <h5 className={styles.register__formHeader}>Sign Up</h5>
                    { this.displayErrors() }
                    <form onSubmit={ this.handleFormSubmit }>
                        <div className="form-group">
                            <label htmlFor="name" className="text-muted">Username</label>
                            <input 
                                onChange={this.handleInputChange('name')} 
                                type="text" name="name" 
                                className="form-control"
                                value={ name }
                                autoComplete="off"
                                />
                        </div>

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
                        <button className="btn btn-block btn-outline-secondary">SIGN UP</button>
                    </form>
                    <p className="mt-3">
                        <small className="text-muted">Already have an account ? Please  
                            <Link to="/login" className="text-secondary"> Sign In</Link>
                        </small>
                </p>
                </div>
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
        }else if (this.state.success){
            return(
                <div className={styles.successMsg}>
                    <span>{ this.state.success } </span><Link to='/login'><p>Log In</p></Link>
                </div>
            )
        }
    }
        
    render() { 
        const { name, email, password } = this.state;
        return ( 
            this.renderForm(name, email, password)
        );
    }
}
 
export default Register;