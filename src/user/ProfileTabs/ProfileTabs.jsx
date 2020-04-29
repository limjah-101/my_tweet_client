import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/default-avatar.jpg';
import './profileTabs.scss';


class ProfileTabs extends Component {
    
    
    state = {  }
            
    render() {
        console.log(this.props)
        const { following, followers }  = this.props;
        return ( 
            <div className="tabs">                
                <div className="tabs__followers">
                    <h6>FOLLOWERS</h6><hr/>
                    { followers.map( (follower, id) => (
                        <div key={id}>                            
                            <img 
                                className="tabs__followers-img"                                                                                        
                                onError={ i => (i.target.src = `${avatar}`)}
                                src={`${process.env.REACT_APP_API_URI}/user/photo/${follower._id}`}                                                                           
                            />
                            
                            <Link to={`/user/${follower._id}`}>
                                <p className="tabs__followers-link">{follower.name}</p>                            
                            </Link>
                        
                        </div>
                    ))}

                </div>
                <div className="tabs__following">
                    <h6>FOLLOWING</h6><hr/>
                    { following.map( (isfollowing, id) => (
                        <div key={id}>                            
                            <img 
                                className="tabs__following-img"
                                onError={ i => (i.target.src = `${avatar}`)}
                                src={`${process.env.REACT_APP_API_URI}/user/photo/${isfollowing._id}`}                                
                            />
                            
                            <Link to={`/user/${isfollowing._id}`}>
                                <p className="tabs__followers-link">{isfollowing.name}</p>                                                                            
                            </Link>
                              
                        </div>
                    ))}
                </div>
            </div>
            
        )
    }
}
 
export default ProfileTabs;