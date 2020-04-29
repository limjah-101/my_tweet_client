import React from 'react';
import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Footer/Footer';

const Layout = props => {                
    return ( 
        <>
            <Navbar />
                <div className="">
                    {props.children}
                </div>
            {/* <Footer /> */}
        </>
    );
}

export default Layout;