import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import defaultImage from '../../assets/node.png'
import { isAuthenticated } from '../../auth';
import { getPost ,updatePost } from '../apiPosts';
import './editpost.scss';
import { AiOutlineWarning } from 'react-icons/ai';
// import Spinner from '../../components/loading/Spinner';

class EditPost extends Component {
    
    constructor(){
        super();
        this.state = {
            id: '',
            title: '',
            body: '',
            postedBy: '',
            fileSize: 0  ,
            redirect: false ,
            error: ''       
        }
    }

    componentDidMount(){
        this.postData = new FormData();  
        const postId = this.props.match.params.postId;
        this.getPost(postId);
    }

    getPost = postId => {
        const token = isAuthenticated().token;
        getPost(postId, token)
            .then(res => {
                if(res.error){
                    console.log(res.error)
                } else {                    
                    this.setState({ 
                        id: res._id,                        
                        title: res.title, 
                        body: res.body,
                        postedBy: res.postedBy                                          
                    });
                }
            });                
    }

    handleInputChange = name => e => {        
        this.setState({ error: '' });        
        const formValues = name === "photo" ? e.target.files[0] : e.target.value;        
        const fileSize = name === "photo" ? e.target.files[0].size : 0;                
        this.postData.set(name, formValues);               
        this.setState({  [name]: formValues, fileSize });        
    }

    backFunction = () => {
        return this.props.history.goBack();
    }

    handleFormSubmit = e => {
        e.preventDefault();                        
        if (this.isInputValid()){
            
            const postId = this.state.id;
            const token = isAuthenticated().token; 

            updatePost(postId, token, this.postData)            
                .then( data => {
                    if(data.error) {
                        console.log(data.error)
                        this.setState({ error: data.error })
                    } else {                                                                      
                        this.setState({ 
                            title:'',
                            body:'',
                            redirect: true 
                        })                        
                    }
                })
        }
    }

    isInputValid = () => {
        const { title, body, fileSize } = this.state;

        if (fileSize > 100000) {
            this.setState({ error: "Photo should be less than 100kb(1Mb)" });
            return false;
        }

        if (title.length === 0){
            this.setState({ error: "Title is require!" })
            return false;
        }

        if (body.length === 0){
            this.setState({ error: "Body is require!" })
            return false;
        }
        
        return true;
    }

    renderForm = (id, title, body) => {
        return(                                              
            <form onSubmit={ this.handleFormSubmit }>                        
                <label htmlFor="photo" className="text-muted">Choose an image
                    <input 
                        onChange={this.handleInputChange('photo')} 
                        type="file" 
                        className="form-control input-file"
                        accept="image/*"                              
                /></label>
                                    
                <input 
                    onChange={this.handleInputChange('title')} 
                    type="text" name="title" 
                    className="form-control"
                    value={ title }
                    />
                
                <textarea 
                    onChange={this.handleInputChange('body')} 
                    type="text" name="body" 
                    className="form-control"
                    value={ body }
                    />
            
                <div className="form-btns">
                    <button className="btn-green">UPDATE</button>
                    <button 
                    onClick={this.backFunction}
                    className="btn-green">CANCEL</button>
                </div>                        
            </form>
           
        )
    }

    displayErrors = () => {        
        if (this.state.error) {
            return(
                <div className="error-msg">
                    <span ><AiOutlineWarning size={25} color="orangeRed" /> { this.state.error }</span>
                </div>
            ) 
        }       
    }
                
    render() { 
        const { id, title, body, postedBy, redirect } = this.state;
        if (redirect){
            return <Redirect to={`/user/${postedBy._id}`} />
        }
        return ( 
            <section className="section-editpost">
                <div className="section-editpost__header">
                    <h1>Edit <span>Tweet</span></h1>
                    {this.displayErrors()}
                </div>
               
                <div className="section-editpost__content">
                    <img
                        onError={i => (i.target.src = `${defaultImage}`)}
                        src={`${process.env.REACT_APP_API_URI}/post/photo/${id}?${new Date().getTime()}`}
                        alt={title}                        
                    />
                    { this.state.id ? this.renderForm(id, title, body) : null }
                </div>
            </section>
        );
    }
}
 
export default EditPost;