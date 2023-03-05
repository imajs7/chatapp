import React from 'react'
import './logo.css';
import logoImage from '../../images/merncloud-black-bg.jpg'

const Logo = () => {
  return (
    <div className='logo-container'>
        <div className='logo-image-container'>
            <img src={logoImage} alt="logo" className='logo-image' />
        </div>
        <div className="logo-text-container">
            <h2 className='logo-text'>MernChat</h2>
        </div>
    </div>
  )
}

export default Logo