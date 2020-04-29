import React, { Component } from 'react';
import './findPeople.scss';
import Spinner from '../../components/loading/Spinner';
import avatar from '../../assets/default-avatar.jpg';
import { isAuthenticated } from '../../auth'
import { findPeople, follow } from '../apiUser';
import { Link } from 'react-router-dom';

class FindPeople extends Component {
    
    state = { 
        users: [],
        error: undefined,
        open: false,
        followMsg: undefined
    }

    componentDidMount(){ 
        let userId = isAuthenticated().user._id;   
        let token = isAuthenticated().token; 
        findPeople(userId, token)
            .then( res => {
                if (res.error) {
                    console.log(res)
                } else {              
                    this.setState({ users: res.data })
                }
            })
    }

    /**
     * SET USERS AS FOLLOWED | REMOVE USER FROM TOFOLLOW LIST
     */
    clickFollow = (user, index) => {
        let userId = isAuthenticated().user._id;   
        let token = isAuthenticated().token; 
        follow(userId, token, user._id)
            .then( data => {
                if (data.error) {
                    console.log(data.error)
                    this.setState({ error: data.error })
                }else {
                    console.log(data)
                    let followList = this.state.users;
                    followList.splice( index, 1 );
                    this.setState({ users: followList, open: true, followMsg: `You're following ${user.name} now` })
                }
            })
    }
    
    renderUsers =  users => {
        return (                        
            <>
                { users.map( (user, index) => {
                    return(
                        <article key={index} className="friends-card"> 
                            <div className="friends-card__img">
                                <img 
                                    onError={ i => (i.target.src = `${avatar}`)}
                                    src={`${process.env.REACT_APP_API_URI}/user/photo/${user._id}`}
                                    alt={user.name}                                 
                                    />
                            
                                <Link to={`/user/${user._id}`}>
                                    {user.name}
                                </Link>
                            </div>                           
                            <div></div>                                                     
                            <button 
                                onClick={ () => this.clickFollow(user, index) }
                                className="btn-green">
                                follow
                            </button>                                                                   
                        </article>
                    )
                })}
            </>            
        )
    }
    
    render() {      
        const { users, open, followMsg } = this.state;
        return ( 
            <div className="section-friends">                
                <div className="section-friends__header">
                    <h1>Who To <span>Follow</span></h1>
                    { open && <span>{ followMsg }</span> }
                </div> 
                <div className="section-friends__content">
                    { users ? this.renderUsers(users) : <Spinner /> }                
                </div>
            </div>
        );
    }
}
 
export default FindPeople;