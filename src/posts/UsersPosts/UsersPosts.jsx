import React, { Component } from 'react';
import defaultImg from '../../assets/tropical-escape.jpg'
import { Link } from 'react-router-dom';
// import { AiOutlinePlusCircle } from "react-icons/ai";
import Spinner from '../../components/loading/Spinner';

class UsersPosts extends Component {
    
    
    postsCard = posts => {
        return(
            posts.map( post => {
                // const isTweetter = post.postedBy ? `/user/${post.postedBy._id}` : "";
                // const tweeterName = post.postedBy ? post.postedBy.name : " Unknown ";
                return(
                    <div key={post._id} className="card mb-2 mr-3 border-0" style={{maxWidth: '540px'}}>
                    <div className="row no-gutters">
                        <div className="col-md-4 p-3">
                            <img 
                                onError={ i => (i.target.src = `${defaultImg}`)}
                                src={`${process.env.REACT_APP_API_URI}/post/photo/${post._id}?${new Date().getTime()}`} 
                                className="img-thumbnail mb-1" 
                                alt={post.title} 
                                style={{width:'100%', height: '70px', objectFit: 'cover'}}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <Link to={`/post/${post._id}`} className="text-secondary">                                    
                                    <p className="card-title m-0">{ post.title }</p>
                                </Link>
                                <small className="card-text">{ post.body.substring(0, 50) } ...</small>                                                                    
                                <p className="card-text m-0">                                    
                                    <small className="text-muted">on { new Date(post.created).toDateString() }</small>
                                </p>
                                                                                    
                            </div>                        
                        </div>
                    </div>
                </div>
                )
            })
        )
    }
    
    render() { 
        return ( 
            <div>
                {this.props.posts ? this.postsCard(this.props.posts) : <Spinner  />}
            </div>
         );
    }
}
 
export default UsersPosts;