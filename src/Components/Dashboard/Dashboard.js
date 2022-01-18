import React from 'react'
import girlPoster from '../../asset/girl.jpeg';
import './Dashboard.css';
import InstaLogo from '../../asset/insta.png'
import ReebokLogo from '../../asset/reebok.png'
import Shopee from '../../asset/shopee1.png'
import SubwayLogo from '../../asset/subway.png'
import Tokopedia from '../../asset/tokopedia.png'
import NetflixLogo from '../../asset/netflix.png'
import Marvel from '../../asset/marvel.png'
import Telegram from '../../asset/telegram.png'
import AssetBack from '../../asset/assetback.jpeg'



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
           <img class="poster" src={AssetBack} alt=''/>
            </div>
           <div className='testimonial'>
           <div className='testimonial-title'>
           Why Us
           </div>
            <div className='testimonial-cards'>
                {testimonialData.map(cardData=>
               <div className='testimony-card'>
                <div className='testimony-card-title'>{cardData.title}</div>
                <div className='testimony-card-desc'>{cardData.description}</div>
             </div>
                )}
            </div>
           </div>

           <div className='clientLogo'>
               <div className='clientTitle'>
               Companies Who Trust Us
               </div>
               <div className='companiiesLogo'>
                   <img src={InstaLogo}/>
                   <img src={SubwayLogo}/>
                   <img src={ReebokLogo}/>
                   <img src={NetflixLogo}/>
               </div>
               <div className='companiiesLogo'>
                   <img src={Shopee}/>
                   <img src={Telegram}/>
                   <img src={Marvel}/>
                   <img src={Tokopedia}/>
               </div>
           </div>
        </div>
    )
}
