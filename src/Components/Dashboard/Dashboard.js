import React from 'react'
import girlPoster from '../../asset/girl.jpeg';
import './Dashboard.css';

export default function Dashboard() {
  
    const testimonialData=[
        {
            title:'Get more visibility',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
        },
        {
            title:'Organize your candidates',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            title:'Verify their abilities',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
        }
       
    ]
    return (
        <div>
            <div className='mainContent'>
            <div className='welcome-text'>
                Welcome to <span className="title-text">
                    My<span className='highlighted'>Jobs</span></span>
                    <button className='getStartedCta'>Get Started</button>
                    </div>
           <img class="poster" src={girlPoster} alt=''/>
            </div>
           <div className='testimonial'>
           <div className='testimonial-title'>
           Why Us
           </div>
            <div className='testimonial-cards'>
                {testimonialData.map(cardData=>
               <div className='card'>
                <div className='card-title'>{cardData.title}</div>
                <div className='card-desc'>{cardData.description}</div>
             </div>
                )}
            </div>
           </div>
        </div>
    )
}
