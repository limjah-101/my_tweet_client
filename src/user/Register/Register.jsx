import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';

import { register } from '../../auth';

class Register extends Component {
    
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            success: '',
            errorName: '',
            errorEmail: '',
            errorPwd: ''
        }
    }

    handleInputChange = name => e => {        
        this.setState({ [name]: e.target.value });  
        this.resetForm();      
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            const { name, email, password } = this.state;
            const user = {
                name: name,
                email: email,
                password: password
            }    
            register(user)
                .then( data => {
                    if (data.error) {
                        this.setState({ errorName: data.error })                        
                    }else {
                        this.setState({
                            name: '',
                            email: '',
                            password: '',
                            errorName: '',
                            success: data.message
                        })
                    }
                });            
        }
    }

    isValid = () => {
        const { name, email, password } = this.state;        
        if (name.length === 0){
            this.setState({ errorName: "Veuillez saisir votre nom" })
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){            
            this.setState({ errorEmail: "Veuillez saisir un email valide." })
            return false
        }
        if (password.length === 0){
            this.setState({ errorPwd: "Veuillez saisir un mot de passe." })
            return false;
        }else if(password.length < 6) {
            this.setState({ errorPwd: "Minimum 6 caratères." })
            return false;
        }        
        return true;
    }
    resetForm = () => {
        this.setState({            
            errorName:'',
            errorEmail:'',
            errorPwd:''

        })
    }
       
    render() { 
        const { name, email, password } = this.state;
        return ( 
            <section className="section">
                <div className="section__register">

                </div>
                <div className="section__form">
                    <div className="section__form-header">                        
                        <h3 className="">Créer un compte</h3>
                    </div>

                    <form onSubmit={ this.handleFormSubmit }>
                        <div className="form-block">                            
                            <input 
                                onChange={this.handleInputChange('name')} 
                                type="text" 
                                name="name"                                 
                                value={ name }
                                autoComplete="off"
                                placeholder="Nom"

                                />
                        </div>
                        {this.state.errorName ? <p className="section__form-error">{this.state.errorName}</p> : ''}
                        


                        <div className="form-block">                            
                            <input 
                                onChange={this.handleInputChange('email')} 
                                type="email" name="email"                                 
                                value={ email }
                                autoComplete="off"
                                placeholder="Email"

                                />
                        </div>
                        {this.state.errorEmail ? <p className="section__form-error">{this.state.errorEmail}</p> : ''}

                        <div className="form-block">                            
                            <input 
                                onChange={this.handleInputChange('password')} 
                                type="password" 
                                name="password"                                 
                                value={ password }
                                autoComplete="off"
                                placeholder="Mot de passe"
                                />        
                        </div>
                        {this.state.errorPwd ? <p className="section__form-error">{this.state.errorPwd}</p> : ''}             
                        <div className="form-block">
                            <button className="">Créer un compte</button>
                        </div>                        
                    </form>
                    <div className="section__form-footer">                        
                        <p className="">Déja membre ? 
                            <Link to="/login" className=""> Se connecter</Link>
                        </p>                                     
                    </div>
                </div>
            </section>
        );
    }
}
 
export default Register;