import React from 'react';
import './allPost.scss';
import defaultImg from '../../assets/tropical-escape.jpg'
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import {AiFillLike} from 'react-icons/ai';

const AllPosts = props => {
    console.log("POST",props)
    const { post } = props;
    const isTweetter = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const tweeterName = post.postedBy ? post.postedBy.name : " Unknown ";

    return(       
        <article className="post-card">
            <div className="post-card__header">                        
                <img                    
                    onError={ i => (i.target.src = `${avatar}`)}
                    src={`${process.env.REACT_APP_API_URI}/user/photo/${post.postedBy._id}?${new Date().getTime()}`} 
                    alt={post.postedBy.name}                    
                />                        
                <span>                    
                    by <Link to={`${isTweetter}`} >{ tweeterName } </Link>
                    on { new Date(post.created).toDateString() }                    
                </span>                            
            </div>
            <img 
                onError={ i => (i.target.src = `${defaultImg}`)}
                src={`${process.env.REACT_APP_API_URI}/post/photo/${post._id}`}                 
                alt={post.title}                 
            />
        
            <div className="post-card__footer">
                <span><AiFillLike size={20}/> {post.likes.length} </span>
                <Link to={`/post/${post._id}`}>                            
                    <h4>{ post.title }</h4>
                </Link> 
                <p className="">{ post.body.substring(0, 100) }</p>                                                
                <Link to={`/post/${post._id}`} className="">
                    Read More ...
                </Link>                        
            </div>                                                
        </article>
       
    )
}
 
export default AllPosts;

