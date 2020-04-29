import React, { Component } from 'react';
import './backroundPhoto.style.css';

import { isAuthenticated }  from '../../auth';
import { backgroundImageHandler } from '../apiUser'

class UserBackgroundPhoto extends Component {

    state = {
        title: ''
    }
    
    componentDidMount(){
        this.photoData = new FormData()
    }
    
    handleChange = name => e => {
        const formValues = name === "photo" ? e.target.files[0] : e.target.value;
        
        this.photoData.set(name, formValues);
        // this.setState({ [name]: formValues });
    }

    handleSubmit = e => {
        e.preventDefault();  
        // for (var pair of this.photoData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }      
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        backgroundImageHandler(userId, token, this.photoData)
            .then( data => {
                if (data.error){
                    console.log(data.error)
                }else {
                    console.log("BACKGROUND IMAGE", data)
                }
            })
    }

    renderForm = () => {
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="file" 
                        name="photo" 
                        accept="image/*"
                        onChange={this.handleChange("photo")}
                    />
                    {/* <div className="form-group">
                    <label htmlFor="" className="text-muted">Title</label>
                    <input 
                        onChange={this.handleChange("title")}
                        value={this.state.title}
                        type="text" 
                        name="title"
                        className="form-control"
                    />
                </div> */}
                    <div>
                        <button className="btn btn-info">SAVE</button>
                    </div>
                </form>
            </>
        )
    }
    
    render() { 
        return ( 
            <div className="section-backgroundForm">
                <div className="backgroundForm__container">
                    { this.renderForm() }
                </div>
            </div>
        );
    }
}
 
export default UserBackgroundPhoto;