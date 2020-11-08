import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import'./navbar.scss';
import logo from '../../assets/sz-logo.png';

import { FaTimes } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { isAuthenticated, logout } from '../../auth';
import { MdClearAll } from "react-icons/md";



class Navbar extends Component{
    
    constructor(){
        super()
        this.state = {
            toggle: false,
            sidebar: ''
            
        }
    }
    
    showSidebar = () => {        
        this.setState({ sidebar: 'show-sidebar' })
    }
    hideSidebar = () => {
        this.setState({ sidebar: '' })
    }

    redirectToAccount = id => {
        return window.location.href=(`/user/${id}`)
    }
        
   

    isLinkActive = (history, path) => {
        if (history.location.pathname === path){
            return { color: "  rgb(94, 98, 214)", background: "transparent" }
        } else {
            return { color: "" }
        }
    }

    renderNavbar = history => {                    
        return(  
            <>      
                <nav className={`nav`}>                                            
                    <div className="nav-center">
                        <div className="nav-header">
                            <Link to="/"><img src={logo} alt=""  className="nav-logo" /></Link>
                            <MdClearAll className="nav-menu" onClick={this.showSidebar}/>
                        </div>
                                    
                    {isAuthenticated() 
                        ? (                        
                            <ul className="nav-links">
                               
                                <li>
                                    <Link to="/post/new" style={this.isLinkActive(history, "/post/new")}>Tweet</Link>
                                </li>
                                <li>
                                    <Link to="/find-people" style={this.isLinkActive(history, "/find-people")}>Follows</Link>
                                </li>
                                <li>
                                    <Link to="/all-users" style={this.isLinkActive(history, "/all-users")}>Users</Link>
                                </li>
                                                              
                                <li onClick={() => this.redirectToAccount(isAuthenticated().user._id)}>
                                    <Link to="#">Profile</Link>
                                </li>
                                <li onClick={() => logout(() => history.push('/'))}>
                                    <Link className="nav-links_logout" to="#"><AiOutlineLogout /></Link>
                                </li>

                            </ul>                        
                        )
                        : (                       
                            <ul className="nav-links auth"> 
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li className="nav-auth">
                                    <Link to="/login" style={this.isLinkActive(history, "/login")}>Connection</Link>
                                </li>                           
                                <li className="nav-auth">
                                    <Link to="/register" style={this.isLinkActive(history, "/register")}>Créer compte</Link>                             
                                </li>
                            </ul>
                        )
                    }
                    </div>
                </nav>
                <aside className={`sidebar ${this.state.sidebar}`}>
                    <div>
                        <FaTimes className="close-btn" onClick={this.hideSidebar} />
                        { isAuthenticated() 
                            ?  ( 
                                <ul className="sidebar-links">
                                    <li><a href="/">Home</a></li>
                                    <li 
                                        className="sidebar-links-profile"
                                        onClick={() => this.redirectToAccount(isAuthenticated().user._id)}>Profile</li>
                                    <li><a href="/post/new">Tweet</a></li>
                                    <li><a href="/all-users">Users</a></li>
                                    <li><a href="/find-people">Follows</a></li>
                                    <li>
                                        <AiOutlineLogout
                                            onClick={() => logout(() => history.push('/'))}
                                            size={60}
                                            className="sidebar-links-logout"
                                            data-toggle="tooltip"
                                            title="Log Out"
                                        />
                                    </li>
                                </ul>
                            )
                            : (
                                <ul className="sidebar-links">
                                    <li><a href="/login">Sign In</a></li>
                                    <li><a href="/register">Sign Up</a></li>
                                </ul>
                            )
                        }                                                
                    </div>
                </aside>
            </>
        )        
    }

    render() {                  
        return (
            <>                    
                { this.renderNavbar(this.props.history) }
            </>
        )
    }
}

export default withRouter(Navbar);