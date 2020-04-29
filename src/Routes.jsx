import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout';
import Home from './components/Home/Home';
import Register from './user/Register';
import Login from './user/Login';
import FindPeople from './user/FindPeople/FindPeople';
import AllUsers from './user/AllUsers/AllUsers';
import Profile from './user/Profile/Profile';
import EditProfile from './user/EditProfile/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import NewPost from './posts/NewPost/NewPost';
import SinglePost from './posts/SinglePost/SinglePost';
import EditPost from './posts/EditPost/EditPost';


const Routes = () => {
    return (     
        <Layout>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/home" component={ Home } />
                <Route path="/register" component={ Register }/>
                <Route path="/login" component={ Login } />
                <PrivateRoute path="/find-people" component={ FindPeople } />
                <Route path="/all-users" component={ AllUsers } />
                <PrivateRoute path="/user/edit/:userId" component={ EditProfile } />
                <PrivateRoute path="/user/:userId" component={Profile} />
                <PrivateRoute path="/post/new" component={NewPost} />
                <PrivateRoute path="/post/edit/:postId" component={EditPost} />
                <PrivateRoute path="/post/:postId" component={SinglePost} />
            </Switch>
        </Layout>    
    );
}
 
export default Routes;