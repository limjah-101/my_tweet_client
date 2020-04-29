import React from 'react';
import './home.scss';
import AllPosts from '../../posts/AllPosts/AllPosts';
import { getAllPosts } from '../../posts/apiPosts'

class Home extends React.Component {
    
    state = { 
        posts:[]
     }
    
    componentDidMount(){
        this.fetchAllPosts();
    }
    
    fetchAllPosts = () => {
        getAllPosts()
            .then(data => {
                if(data.error){
                    console.log(data.error)
                } else {
                    console.log(data)
                    this.setState({ posts: data.posts })
                }
            })        
    }
    
    render() { 
        const { posts } = this.state;
        return ( 
            <section className="section-allpost">               
                <div className="section-allpost__header">
                    <h1 className="">Recent <span>Posts</span></h1>
                </div> 
                <article className="section-allpost__container"> 
                    { posts.map( (post,i) => {
                        return(                              
                                <AllPosts post={post} key={i}/>                                                                                         
                        )
                    })}                   
                </article>
            </section>
         );
    }
}
 
export default Home;
