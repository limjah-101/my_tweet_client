import React, { Component } from 'react';
import './allUsers.scss';
import Spinner from '../../components/loading/Spinner';
import avatar from '../../assets/default-avatar.jpg';
import { getAllUsers } from '../apiUser';
import { Link } from 'react-router-dom';
import { GoMail, GoCalendar } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";


class AllUsers extends Component {
    
    constructor(){
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount(){        
        getAllUsers()
            .then( res => {
                if (res.error) {
                    console.log(res.error)
                } else {    
                    console.log(res)                
                    this.setState({ users: res.users })
                }
            })
    }

    renderUsers =  users => {
        return (                        
            <>
                               
                { users.map( user => {
                    return(
                        <div key={user._id} className="user-card" >
                            <div className="user-card__img">                                
                                <img 
                                    onError={ i => (i.target.src = `${avatar}`)}
                                    src={`${process.env.REACT_APP_API_URI}/user/photo/${user._id}`}
                                    alt={user.name}                                     
                                    />
                            </div>
                                
                                <div className="user-card__body">                                    
                                    <div className="user-card__body-item">
                                        <FaRegUser size="20" />
                                        <Link to={`/user/${user._id}`}>
                                            {user.name}
                                        </Link>
                                    </div>
                                    <div className="user-card__body-item" >
                                        <GoMail size="20"/> 
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="user-card__body-item" >                                            
                                        <GoCalendar size="20" className="" /> 
                                        <p>{`${new Date(user.created).toDateString().substring(3)}`}</p>
                                    </div>
                                    
                                </div>                                
                        </div>
                    )
                })}
            </>            
        )
    }
    render() {        
        return ( 
            <div className="section-users">
                <div className="section-users__header">                    
                    <h1>Find more <span>friends</span></h1>                                    
                </div>                
                <div className="section-users__content">
                    {this.state.users 
                        ? 
                        this.renderUsers(this.state.users)                            
                        : <Spinner />}
                </div>
            </div>
        );
    }
}
 
export default AllUsers;