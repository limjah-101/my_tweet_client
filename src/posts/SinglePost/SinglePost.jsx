import React, { Component } from 'react';
import './singlePost.css';
import { Redirect } from 'react-router-dom';
import { getPost } from '../apiPosts';
import defaultImg from '../../assets/tropical-escape.jpg';
import avatar from '../../assets/avatar.png';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import Spinner from '../../components/loading/Spinner';
import { isAuthenticated } from '../../auth';
import { deletePost, like, unlike } from '../apiPosts';
import { FaRegComment } from "react-icons/fa";
import Comment from '../Comment/Comment';


class SinglePost extends Component {
    
    constructor(){
        super();
        this.state = {
            post: '',            
            redirect: false, 
            redirectToSignIn: false,  
            like: false,            
            likes: 0,
            comments: []            
        }
    }

    componentDidMount(){
        const id = this.props.match.params.postId;
        getPost(id)
            .then( data => {
                if (data.error){
                    console.log(data.error)
                }else {   
                    console.log("SINGLE POST",data)                 
                    this.setState({ 
                        post: data, 
                        likes: data.likes.length, 
                        like: this.isAlreadyLiked(data.likes),
                        comments: data.comments

                    })
                }
            });
    }

    /**
     * 
     */
    updateComments = comments => {
        this.setState({ comments: comments });
    }

    /**
     * ALLOW ONLY TO LIKE ONCE
     * CHECK IF USERID IS ALREADY IN ARRAY
     * RETURN BOOLEAN -> if not found (false) return -1
     */
    isAlreadyLiked = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let findUserId = likes.indexOf(userId) !== -1;
        return findUserId;
    }

    /**
     * TOGGLE API REQUEST
     * HANDLE ERROR if USER is not loggedIN and like post
     */
    toggleLikeIconHandler = () => {
        //handle not logged in user error
        if (!isAuthenticated()){
            this.setState({ redirectToSignIn: true })
            return false;
        }

        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.match.params.postId;
        let request = this.state.like ? unlike : like;

        request(userId, token, postId)
            .then( data => {
                if (data.error){
                    console.log(data.error)
                }else{
                    console.log(data)
                    this.setState({ 
                        like: !this.state.like,
                        likeIcon: !this.state.likeIcon,
                        likes: data.likes.length 
                    })
                }
            })
        
    }
        
    renderPost = (_id, title, body, created, updated, postedBy, likes, like, comments) => { 
        const isTweetter = postedBy ? `/user/${postedBy._id}` : "";
        const tweeterName = postedBy ? postedBy.name : " Unknown ";
        return ( 
            <>                                  
                    <div className="p-2 row justify-content-between rounded-lg">  
                        <div className="d-flex">
                            <img                                                                             
                                onError={ i => (i.target.src = `${avatar}`)}
                                src={`${process.env.REACT_APP_API_URI}/user/photo/${postedBy._id}?${new Date().getTime()}`} 
                                alt={postedBy.name}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgb(130,138,136)', objectFit: 'cover'  }}
                            />                        
                            <p className="font-italic my-auto ml-2">
                                <small> 
                                    <Link to={`${isTweetter}`} > { tweeterName } </Link>                                    
                                </small>
                            </p>
                        </div>                      
                        <div>
                            <Link to={`/home`} className="align-self-center text-secondary text-muted">
                                <IoIosArrowBack size={35} />Back to posts
                            </Link>
                        </div>
                    </div>
                    
                    <h5 className="display-4 font-weight-lighter">{ title }</h5>                    
                    <div className="">
                        <p className="lead">{ body }</p>
                    </div>
                    <img 
                        onError={ i => (i.target.src = `${defaultImg}`)}
                        src={`${process.env.REACT_APP_API_URI}/post/photo/${_id}?${new Date().getTime()}`} 
                        className="rounded-top" 
                        alt={title} 
                        style={{width:'100%', height: '350px', objectFit: 'cover'}}
                    />    
                             
                <div className="card-body rounded-bottom" style={{background:'rgba(130,138,136, .05)'}}>                     
                                        
                    <p className="text-muted m-0">
                        <small>                                
                            { new Date(created).toDateString().substring(3) }                             
                        </small>
                        <small className="ml-2">                                                            
                            { new Date(created).toLocaleTimeString() }
                        </small>
                    </p>                   
                    <p className="text-muted mb-2">
                        <small>                                
                            Last update { updated ? new Date(updated).toDateString() : '_'}
                        </small>
                    </p>

                    <div className="d-flex">
                        <div>
                            {like 
                            ? <TiThumbsUp 
                                data-toggle="tooltip" title="like"                                
                                className="like-icon"
                                onClick={this.toggleLikeIconHandler} />
                            : <TiThumbsDown 
                                data-toggle="tooltip" title="dislike"
                                className="dislike-icon"                                                                
                                onClick={this.toggleLikeIconHandler} />
                            }
                            
                            <span className="badge icon-badge" >
                                {likes}
                            </span>
                        </div>
                        <div className="ml-5">                  
                            <FaRegComment className="comment-icon"/>
                            <span className="badge icon-badge" >
                                {comments.length}
                            </span>                    
                        </div>
                    </div>
                    <div>
                        {isAuthenticated().user &&
                        isAuthenticated().user._id === postedBy._id 
                    ?(
                        <div className="d-flex flex-row-reverse text-secondary">
                            <AiOutlineDelete 
                                onClick={this.confirmPopUp}
                                size={25} 
                                className="loggedInUser__icon delete"
                                data-toggle="tooltip" title="Delete Post"/> Delete

                            <Link to={`/post/edit/${_id}`}  className="mr-3" style={{color: 'grey'}}>
                                Edit <AiOutlineEdit size={27} data-toggle="tooltip" title="Edit Post" className="loggedInUser__icon edit"/>
                            </Link>                            
                        </div>
                    ) : (
                        null
                    )}
                </div>                    
                                            
                </div>                 
            </>
        );
    }

    deletePost = () => { 
        const token = isAuthenticated().token;
        const postId = this.props.match.params.postId;

        deletePost(token, postId)
            .then( data => {
                if(data.error) {
                    console.log(data.error)                    
                } else {                    
                    this.setState({ redirect: true })
                }
            })
    }
    
    confirmPopUp = () => {
        let popUp = window.confirm(`Are you sure to delete this post?`);
        
        if (popUp){
            this.deletePost();    
        }
    }

    render(){
        // console.log('COMMENTS', this.state.comments)
        const { _id, title, body, created, updated, postedBy } = this.state.post;
        const { likes, like, comments } = this.state;               
        
        if(this.state.redirect){
            return <Redirect to="/home" />
        }
        if(this.state.redirectToSignIn){
            return <Redirect to="/login" />
        }
        return(
            <div className="section-post">   
                {/* <div className="row justify-content-between mt-5">                                        
                </div>                             */}
                { this.state.post ? this.renderPost(_id, title, body, created, updated, postedBy, likes, like, comments): <Spinner /> }
                <Comment postId={_id} comments={ comments } updateComments={this.updateComments} />
            </div>
        )
    }

}
 
export default SinglePost;