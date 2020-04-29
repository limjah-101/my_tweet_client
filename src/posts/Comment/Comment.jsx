import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { comment, uncomment } from '../apiPosts';
import { isAuthenticated } from '../../auth';
import avatar from '../../assets/avatar.png';
import { AiOutlineDelete } from "react-icons/ai";
import './comment.scss'
;

class Comment extends Component {
    
    state = {
        text: "",
        error: ""    
    }

    onInputChangeHandler = e => {   
        this.setState({ error: '' });
        this.setState({ text: e.target.value, });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        if (!isAuthenticated()) {
            this.setState({ error: "Please Sign in" });
            return false;
        }
        if (this.isCommentValid()){
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;        
            
            comment(userId, token, postId, { text: this.state.text })
                .then(data => {
                    if (data.error){
                        console.log(data.error)
                    }else {
                        //UPDATE PARENT COMPONENT STATE                        
                        this.props.updateComments(data.comments);
                        this.setState({ text: '' });                                    
                    }                
                })
        }
    }    

    removeComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;        
        
        uncomment(userId, token, postId, comment)
            .then(data => {
                if (data.error){
                    console.log(data.error)
                }else {                                                            
                    this.props.updateComments(data.comments);
                }                
            })
    }
    confirmPopUp = comment => {
        let popUp = window.confirm(`Are you sure to remove the comment?`);
        
        if (popUp){
            this.removeComment(comment);    
        }
    }
        
    renderInput = () => {   
        const userId = isAuthenticated().user._id; 
        return (
            <article className="comment__form">                
                <img                                             
                    className=""
                    onError={ i => (i.target.src = `${avatar}`)}
                    src={`${process.env.REACT_APP_API_URI}/user/photo/${userId}`} 
                    alt="post"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'  }}
                />                
                <div className="comment__form-input">
                    {/* <form> */}
                        <input 
                            className=""
                            onChange={this.onInputChangeHandler}
                            type="text" 
                            name="comment" 
                            autoComplete="off"
                            placeholder="   Leave a comment ..."
                            value={this.state.text}
                        />
                    {/* </form> */}
                    <button 
                        className="btn-green"                        
                        onClick={ this.handleFormSubmit }
                        >Comment</button>
                </div>                
            </article>
        )
    }

    renderComment = comments => {
        return(
            comments.map( comment => {
                return(
                    <div className="comment__card" key={ comment._id }>                        
                        <Link to={`/user/${comment.postedBy._id}`}>
                            <img                                             
                                className="float-left mr-3"
                                onError={ i => (i.target.src = `${avatar}`)}
                                src={`${process.env.REACT_APP_API_URI}/user/photo/${comment.postedBy._id}?${new Date().getTime()}`} 
                                alt={comment._id}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'  }}
                            />
                        </Link>                                                
                        <div className="comment__card-content">
                            <p className="">{comment.text}</p>                            
                            <span>
                                Posted by: 
                                    <Link to={`/user/${comment.postedBy._id}`} > { comment.postedBy.name } </Link>
                                    on { new Date(comment.created).toDateString().substring(3) } | { new Date(comment.created).toLocaleTimeString() }
                                
                            </span>
                        </div>
                                                
                        {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                            <AiOutlineDelete 
                            className="icon-delete"
                            onClick={() => { this.confirmPopUp(comment) }}
                            />  
                        )}                                              
                    </div>
                )
            })
        )
    }

    isCommentValid = () => {
        const { text } = this.state;
        if ( !text.length > 0 || text.length > 150 ) {
            this.setState({ error: "Comment should be between 1 and 150 characters." });
            return false;
        }
        return true;
    }
    renderErrorMsg = () => (        
        <span className="badge badge-danger">{ this.state.error }</span>

    )
                    
    render() { 
        const { comments } = this.props
        return ( 
            <>                
                <div className="row flex-column">
                    { this.renderComment(comments) }
                </div>
                <div className="row mt-3">
                    { this.renderInput() }
                </div>
                <div className="row justify-content-center mb-5">
                    {this.state.error ? this.renderErrorMsg() : null}
                </div>
            </>
        );
    }
}
 
export default Comment;