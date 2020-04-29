import React from 'react';
import { follow, unfollow } from '../apiUser';

const FollowProfileButton = (props) => {

    const handleFollow = () => {        
        props.clickFollowButton(follow);
    }

    const handleUnfollow = () => {
        props.clickFollowButton(unfollow)
    }
    
    return ( 
        <div className="d-inline-block">
            { !props.following 
                ?  <button 
                        onClick={ handleFollow }
                        className="btn-green">follow</button>
                :  <button 
                        onClick={ handleUnfollow }
                        className="btn-green">unfollow</button>
            }
            
            
        </div>
    );
}
 
export default FollowProfileButton;