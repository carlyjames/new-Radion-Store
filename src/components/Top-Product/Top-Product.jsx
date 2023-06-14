import React from 'react'
import './TopProduct.css'

import hd from './banner.png'

export  const TopProduct = () => {
    return ( 
        <div className="container TopProductBanner mt-4 px-4 mb-8">
            <img src={hd} style={{ height : '100%', width : '100%', objectFit : 'cover' }} alt="img" />
        </div>
     );
}
 
