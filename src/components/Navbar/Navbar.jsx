import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import'./navbar.scss';
import logo from '../../assets/sz-logo.png';

import { FaTimes } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { isAuthenticated, logout } from '../../auth';
import { GiHamburgerMenu } from "react-icons/gi";

import { Dropdown } from 'react-bootstrap';


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
        
    profileDropDown = (history) => {        
        return (
            <Dropdown>
                <Dropdown.Toggle  id="dropdown-custom-components">
                    <FaRegUserCircle size={30} data-toggle="tooltip" title="My profile"/>                    
                </Dropdown.Toggle>
            
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">                        
                        <li onClick={() => this.redirectToAccount(isAuthenticated().user._id)}>
                            {isAuthenticated().user.name} Profile
                        </li>
                    </Dropdown.Item>
                    {/* <Dropdown.Item eventKey="2">Blue</Dropdown.Item> */}
                    <Dropdown.Item eventKey="3">
                        <AiOutlineLogout 
                            onClick={() => logout(() => history.push('/'))}
                            size={25} 
                            color="orangeRed" 
                            data-toggle="tooltip" 
                            title="Sign Out"
                        />
                    </Dropdown.Item>                    
                </Dropdown.Menu>
            </Dropdown>
        )        
    }

    isLinkActive = (history, path) => {
        if (history.location.pathname === path){
            return { color: "#00DA9E" }
        } else {
            return { color: "#fff" }
        }
    }

    renderNavbar = ( history ) => {                    
        return(  
            <>      
            <nav className={`nav`}>                                            
                <div className="nav-center">
                    <div className="nav-header">
                        <img src={logo} alt=""  className="nav-logo" />
                        <GiHamburgerMenu className="nav-menu" onClick={this.showSidebar}/>
                    </div>
                                
                {isAuthenticated() 
                    ? (                        
                        <ul className="nav-links">
                            <li>
                                <a href="/" style={this.isLinkActive(history, "/")}>Home</a>
                            </li>
                            <li>
                                <a href="/post/new" style={this.isLinkActive(history, "/post/new")}>Tweet</a>
                            </li>
                            <li>
                                <a href="/find-people" style={this.isLinkActive(history, "/find-people")}>Follows</a>
                            </li>
                            <li>
                                <a href="/all-users" style={this.isLinkActive(history, "/all-users")}>Users</a>
                            </li>
                            <li>
                                {this.profileDropDown(history)} 
                            </li>
                        </ul>                        
                    )
                    : (                       
                        <ul className="nav-links"> 
                            <li>
                                <Link to="/login" style={this.isLinkActive(history, "/login")}>Sign In</Link>
                            </li>                           
                            <li>
                                <Link to="/register" style={this.isLinkActive(history, "/register")}>Sign Up</Link>                             
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