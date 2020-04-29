import React from 'react';
import Slick from 'react-slick';
import './carousel.css'


const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slideToScroll: 1,    
}


const Carousel = () => {
    return ( 
        <div className="template">
            <Slick {...settings}>            
                <div className="template__container--1"><p>1</p></div>
                <div className="template__container--2"><p>2</p></div>
                <div className="template__container--3"><p>3</p></div>
            </Slick>
        </div>
    );
}
 
export default Carousel;