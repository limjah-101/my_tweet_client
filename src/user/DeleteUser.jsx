import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import { isAuthenticated, deleteAccount, logout } from '../auth';
import { Redirect } from 'react-router-dom';

class DeleteUser extends React.Component{
    
    state = {
        redirect: false
    }

    deleteProfile = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;

        deleteAccount(token, userId)
            .then( res => {
                if(res) {
                    console.log(res)
                } else {
                    logout(() => { console.log( 'logged Out SUCCESSFULLY' ) });
                    this.setState({ redirect: true })
                }
            })
    }
    
    confirmPopUp = () => {
        let popUp = window.confirm(`We are sad to leave you ${isAuthenticated().user.name}, see you next time!`);
        if (popUp){
            this.deleteProfile()    
        }
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return ( 
            <AiOutlineDelete 
                data-toggle="tooltip" title="Delete Account"
                onClick={this.confirmPopUp}
                size={25}                
            />
        )
    }
}
 
export default DeleteUser;