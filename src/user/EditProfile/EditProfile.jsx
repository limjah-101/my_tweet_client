import React, { Component } from 'react';
import{ Redirect } from 'react-router-dom';
import Spinner from '../../components/loading/Spinner';
import { isAuthenticated } from '../../auth';
import { getUser, updateUserProfile } from '../apiUser';

import { userLocalStorage } from '../apiUser';

import './profileEdit.scss';
import { AiOutlineUser, AiOutlineMail, AiOutlineGlobal, AiFillEnvironment, AiOutlineKey, AiOutlineWarning } from "react-icons/ai";
import avatar from '../../assets/default-avatar.jpg';

class EditProfile extends Component {
    
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            email: '', 
            password: '',
            address: '',
            website: '',
            about: '',
            error: '',
            success: '',   
            fileSize: 0,         
            redirectToProfile: false,
            loading: false     
        }
    }

    componentDidMount(){
        this.userData = new FormData();
        const id = this.props.match.params.userId;
        this.getUserInfos(id);             
    }
    
    getUserInfos = id => {
        const token = isAuthenticated().token;
        getUser(id, token)
            .then(res => {
                if(res.error){
                    console.log(res.error)
                } else {                    
                    this.setState({ 
                        id: res._id, 
                        name: res.name, 
                        email: res.email ,
                        about: res.about,
                        address: res.address,
                        website: res.website                      
                    });
                }
            });                
    }

    handleInputChange = name => e => {        
        this.setState({ error: '' });        
        const formValues = name === "photo" ? e.target.files[0] : e.target.value;
        //Get file size
        const fileSize = name === "photo" ? e.target.files[0].size : 0;        
        //Populate key: value pairs obj (ex: name: toto, email: b@b.b)
        this.userData.set(name, formValues);    
           
        this.setState({  [name]: formValues, fileSize });        
    }

    backFunction = () => {
        return this.props.history.goBack();
    }

    handleFormSubmit = e => {
        e.preventDefault(); 
               
        //check input validation 
        if (this.isInputValid()){
            
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;            
            updateUserProfile(userId, token, this.userData)
            
                .then( data => {
                    if(data.error) {
                        console.log(data.error)
                        this.setState({ error: data.error })
                    } else {                        
                        userLocalStorage( data.user, () => {                            
                            this.setState({ 
                                redirectToProfile: true,
                                success: data.message                            
                            })
                        })
                    }
                })
        }
    }
    
    renderForm = (name, email, about, address, website, password, photoUrl) => {
        return(
            <section className="section">
                <div className="section__header">
                    <h1 >EDIT <span>PROFILE</span></h1>
                    <span>{this.state.error ? <><AiOutlineWarning color="orangeRed" size={25}/> {this.state.error}</> : ''}</span>
                </div>
                
                
                
                <div className="section__container">                    
                    
                    <img
                        onError={i => (i.target.src = `${avatar}`)}
                        src={photoUrl}
                        alt={name}
                    />
                    
                    <form onSubmit={ this.handleFormSubmit }>                                                       
                        <div className="section__container-form_item">  
                            <label htmlFor="file">Choose an image</label>                              
                            <input
                                onChange={this.handleInputChange('photo')}
                                type="file"
                                className="form-control input-file"
                                accept="image/*"
                            />
                        </div>
                        
                        <div className="section__container-form_item">
                            <AiOutlineGlobal size={20} /> 
                            <input
                                onChange={this.handleInputChange('website')}
                                type="text" name="website"                            
                                value={website}
                                autoComplete="off"
                            />
                        </div>                            
                        <div className="section__container-form_item">                                
                            <AiOutlineUser size={20} />
                            <input
                                onChange={this.handleInputChange('name')}
                                type="text" name="name"                                
                                value={name}
                                autoComplete="off"
                            />
                        </div>

                        <div className="section__container-form_item">
                            <AiOutlineMail size={20} />    
                            <input
                                onChange={this.handleInputChange('email')}
                                type="email" name="email"                                
                                value={email}
                            />
                        </div>

                        <div className="section__container-form_item">
                            <AiFillEnvironment size={20} />  
                            <input
                                onChange={this.handleInputChange('address')}
                                type="text" name="address"                                
                                value={address}
                            />
                        </div>

                        <div className="section__container-form_item">
                            <AiOutlineKey size={20} /> 
                            <input
                                onChange={this.handleInputChange('password')}
                                type="text" name="password"                                
                                value={password}
                                placeholder="New password"                                
                            />
                        </div>
                        <div className="section__container-form_textarea">                                
                            <textarea
                                onChange={this.handleInputChange('about')}
                                name="about"
                                placeholder="Your description"                                
                                value={about}
                            />
                        </div>
                        
                        <div className="section__container-form_btn">
                            <button className="btn-green">UPDATE</button>
                            <button
                                onClick={this.backFunction}
                            className="btn-green">CANCEL</button>
                        </div>                                                
                    </form>
                </div>
                
            </section>
        )
    }

    isInputValid = () => {
        const { name, email, password, fileSize } = this.state;

        if (fileSize > 200000) {
            this.setState({ error: "Photo should be less than 200kb(2Mb)" });
            return false;
        }

        if (name.length === 0){
            this.setState({ error: "Name is require!" })
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({ error: "Email must be www@email.com format!" })
            return false
        }
        if (password.length >= 1 && password.length <= 5){
            this.setState({ error: "Password must be at least 6 characters!" })
            return false
        }
        return true;
    }

    // displayErrors = () => {        
    //     if (this.state.error) {
    //         return(
                
    //                 <span >{ this.state.error }</span>
                
    //         ) 
    //     }       
    // }
    
    render() {                 
        const { id, name, about, address, website, email, password, redirectToProfile } = this.state;
        const photoUrl = id 
        ? `${process.env.REACT_APP_API_URI}/user/photo/${id}?${new Date().getTime()}`
        : avatar;
        
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }
        return ( 

            <>                
                { name || email ? this.renderForm(name, email, about, address, website, password, photoUrl) : <Spinner />}
            </>
        );
    }
}
 
export default EditProfile;