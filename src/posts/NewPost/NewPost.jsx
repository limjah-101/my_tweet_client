import React, { Component } from 'react';
import './newPost.scss';
import { isAuthenticated } from '../../auth';
import { createPost } from '../apiPosts';
import { Redirect } from 'react-router-dom';
import { AiOutlineWarning} from 'react-icons/ai';

class NewPost extends Component {
    
    constructor(){
        super();
        this.state = {
            title: '',
            body: '',
            postImgSize: 0,
            error: '',
            user: {},
            loading: false,
            redirectToProfile: false
        }
    }

    componentDidMount(){
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user })        
    }

    handleChange = name => e => {
        this.setState({ error: '' })
        const formValues = name === "photo" ? e.target.files[0] : e.target.value;
        const postImgSize = name === "photo" ? e.target.files[0].size : 0;
        this.postData.set(name, formValues);
        this.setState({ [name]: formValues, postImgSize });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true })
        
        if(this.isInputValid()){
            
            //console.log(this.state)
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            
            createPost(userId, token, this.postData)
                .then(data => {
                    if (data.error) {
                        // console.log(data)
                        this.setState({ error: data.error })
                    } else {
                        console.log("NEW POST", data)
                        this.setState({ redirectToProfile: true, loading: false, title:'', body:'' })
                    }
                })

        }
    }
    
    renderForm = () => { 
        return (             
            <form onSubmit={this.handleSubmit}>                               
                <label htmlFor="file">                
                <input 
                    onChange={this.handleChange("photo")}
                    type="file" 
                    name="photo"
                    accept="image/*"
                    size="40"                        
                />Choose an image </label>             
                <input 
                    onChange={this.handleChange("title")}
                    value={this.state.title}
                    type="text" 
                    name="title"                        
                    placeholder="Need a tweet title"
                    autoComplete="off"
                />            
                <textarea 
                    onChange={this.handleChange("body")}
                    value={this.state.body}
                    name="body"
                    cols="30" 
                    rows="5"
                    className=""
                    placeholder="Tape your history"
                />                                                    
                <button className="btn-green">Tweet</button>
                
            </form>            
        );
    }

    isInputValid = () => {
        const { title, body, postImgSize } = this.state;
        if (postImgSize > 1000000) {
            this.setState({ error: "Image should be less than 1Mg (100Kb)" });
            return false;
        }
        if (title.length === 0){
            this.setState({ error: "A title is required" });
            return false;
        } 
        if (body.length === 0){
            this.setState({ error: "Post body is required" });
            return false;
        }
        return true;
    }

    displayErroMsg = () => {
        if (this.state.error) {
            return(
                <div className="error-msg">
                    <span><AiOutlineWarning size={25} color="orangeRed"/> { this.state.error }</span>
                </div>
            )
        }
    }

    render(){
        if (this.state.redirectToProfile){
            return <Redirect to={`/user/${isAuthenticated().user._id}`}  />
        }
        return(            
            <section className="section-tweet">                
                <div className="section-tweet__header">
                    <h1>New <span>Tweet</span></h1>
                    {this.displayErroMsg()}
                </div>                                   
                <div className="section-tweet__content">                                        
                    { this.renderForm() }                    
                </div>                
            </section>
        )
    }
}
 
export default NewPost;