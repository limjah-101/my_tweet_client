import React, { Component } from 'react';
import { isAuthenticated } from '../../auth';
import { Redirect, Link } from 'react-router-dom';
import Spinner from '../../components/loading/Spinner';
import { AiOutlineUser, AiOutlineMail, AiOutlineEdit, AiOutlineEnvironment, AiOutlineGlobal, AiOutlineTwitter } from "react-icons/ai";
import { MdPhotoCamera } from "react-icons/md";

import image from "../../assets/wp.jpg";
import avatar from '../../assets/default-avatar.jpg';
import { getUser } from '../apiUser';

import DeleteUser from '../DeleteUser';

import './profile.style.scss';

import FollowProfileButton from '../Follow/FollowProfileButton';
import ProfileTabs from '../ProfileTabs/ProfileTabs';
import UsersPosts from '../../posts/UsersPosts/UsersPosts';
import { getUsersPosts } from '../../posts/apiPosts';
import UserBackgroundPhoto from '../UserBackgroundPhoto/UserBackgroundPhoto';


class Profile extends Component {
    
    constructor(){
        super();
        this.state = {
            user: {
                following: [],
                followers: []
            },
            redirectToHome: false,
            About: true,
            followComp: false,
            postComp: false,
            messageComp: false,
            following: false,
            error: '',
            isPage: false,
            popup: false,
            posts: []
        }
    }

    componentDidMount(){
        let userId = this.props.match.params.userId;
        this.getUserInfos(userId);
        this.getUsersPosts(userId)         
            

    }
    //Force page to reload after userProfile change
    componentDidUpdate (prevProps) {
        if (prevProps.location.key !== this.props.location.key) {
            window.location.reload()
        }
    }
    
    //CHECK IF FOLLOW || UNFOLLOW
    checkFollow = user => {
        const jwt = isAuthenticated();        
        //Find followers in [ ] then RETURN BOOL
        const findFollowers = user.followers.find( follower => {            
            return follower._id === jwt.user._id;
        });
        return findFollowers;
    }
    //Handle Follow click --> Send as props (see FollowProfileButton component)
    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        callApi(userId, token, this.state.user._id)
            .then( data => {
                if (data.error) {
                    this.setState({  error: data})
                } else {                    
                    this.setState({  user: data, following: !this.state.following})
                }

            })
    }
    
    getUserInfos = userId => {
        const token = isAuthenticated().token;

        getUser(userId, token)
            .then( res => {
                if (res.error) {
                    this.setState({ redirectToHome: true })
                }else {
                    //Check Follow
                    let following = this.checkFollow(res)                                      
                    this.setState({ user: res, following: following })
                }
            })      
    }

    aboutComponent = (_id, name, about, address, website, email, created) => {        
        return(
            <div className="profile__card">
                <div className="d-flex">
                    <AiOutlineUser size={20} />
                    <div className="ml-3">{name}</div>
                </div>
                <div className="d-flex">
                    <AiOutlineMail size={20} />                               
                    <div className="ml-3">{email}</div>
                </div>
                <div className="d-flex">
                    <AiOutlineEnvironment size={20} />                               
                    <div className="ml-3">{ address ? address : <small>-</small> }</div>
                </div>
                <div className="d-flex">
                    <AiOutlineGlobal size={20} />                               
                    <div className="ml-3">{ website ? website : <small>-</small> }</div>
                </div>
                <div className="mb-3">
                    <small>{`Joined on ${new Date(created).toDateString()}`}</small>
                </div>
                <hr/>
                <div className="d-flex flex-row justify-content-between">
                    <span className="mr-3">
                        followers 
                        <span className="badge badge-warning ml-1" style={{fontSize: '14px'}}>
                            {this.state.user ? this.state.user.followers.length : "0"}
                        </span>
                    </span>
                    <span className="">
                        Following
                        <span className="badge badge-warning ml-1" style={{fontSize: '14px'}}>
                            {this.state.user ? this.state.user.following.length : "0"}
                        </span>
                    </span>
                </div>
                <hr></hr>
                <div className="">                                                                  
                    <div className="mt-3 mb-3">{about}</div>
                </div>
                <hr></hr>
                <div>
                    {isAuthenticated().user &&
                    isAuthenticated().user._id === _id 
                    ?(
                        <div className="d-flex flex-row justify-content-around">
                            <DeleteUser userId={_id} />
                            <Link to={`/user/edit/${_id}`}>
                                <AiOutlineEdit size={25} color="grey" data-toggle="tooltip" title="Edit Profile"/>
                            </Link>
                            <Link to={`/post/new`}>
                                <AiOutlineTwitter size={25} color="grey" data-toggle="tooltip" title="Tweet"/>
                            </Link>
                        </div>
                    ) : (
                        <FollowProfileButton 
                            following={this.state.following} 
                            clickFollowButton={this.clickFollowButton}                            
                        />
                    )}
                </div>
            </div>
        )
    }

    renderAbout = () => {
        this.setState({ About: true,followComp: false, postComp: false , message: false  })
    }
    renderFollow = () => {
        this.setState({ followComp: true, postComp: false})
    }
    renderPosts = () => {
        this.setState({ followComp: false, postComp: true })
    }    

    getUsersPosts = userId => {
        const token = isAuthenticated().token;
        getUsersPosts(userId, token)
            .then( data => {
                if(data.error){
                    console.log(data.error)
                }else {
                    
                    this.setState({ posts: data })
                }
            })
    }
    //BackgroundImage
    // userBackgroundImage = userId => {
    //     const token = isAuthenticated().token;
    //     getBackgroundImage(userId, token).then(data => {
    //         if (data.error){
    //             console.log(data.error)
    //         }else {
    //             console.log("BCK IMAGE", data)
    //         }
            
    //     })
    // }
    
    displayBackgroundPhotoPopup = () => {
        return this.setState({ popup: !this.state.popup})
    }

    renderPopUp = () => {
        return(
            <UserBackgroundPhoto />
        )
    }
    
    renderUserInfos = (_id, name, about, address, website, email, created, profileImg) => {
        return(            
                <section className="profile__container">
                    <div className="profile__container-img" style={{backgroundImage: `url(${image})`}}>                        
                        &nbsp;
                        <MdPhotoCamera
                            onClick={this.displayBackgroundPhotoPopup}
                            className="camera-icon"
                        />
                    </div>                    
                        <img 
                            onError={ i => (i.target.src = `${avatar}`)}
                            src={ profileImg } 
                            alt="profile"                             
                        />                    
                    <div className="profile__container-about">                          
                            {this.state.About ? this.aboutComponent(_id, name, about, address, website, email, created) : <Spinner/>}                        

                        <div className="profile__banner">
                            <div className="profile__banner-items" >
                                <div className="profile__banner-items__item" onClick={this.renderFollow}>
                                    <p>Follows</p>    
                                </div>
                                <div className="profile__banner-items__item" onClick={this.renderPosts}>
                                    <p>Posts</p>    
                                </div>
                            </div>
                            
                            <div className="profile__banner-content">
                                {this.state.followComp ?
                                    <ProfileTabs
                                        followers={this.state.user.followers}
                                        following={this.state.user.following}
                                        isPage={this.state.isPage}
                                /> : <UsersPosts posts={this.state.posts} />}
                                                              
                            </div>
                        </div>                                               
                    </div>                   
                </section>
            
        )
    }
    
    render() {         
        const redirect = this.state.redirectToHome;
        if (redirect) {
            return <Redirect to='/login' />
        }

        const { _id, name, about, address, website, email, created } = this.state.user;
        
        const profileImg = _id 
        ? `${process.env.REACT_APP_API_URI}/user/photo/${_id}?${new Date().getTime()}` 
        : avatar; 

        return (            
            <>
                {this.state.popup ? this.renderPopUp() : null}
                {this.state.user ? this.renderUserInfos(_id, name, about, address, website, email, created, profileImg) : <Spinner />}
            </>
        );
    }
}
 
export default Profile;