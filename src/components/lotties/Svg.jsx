import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from './SvgwineBottle1.json'

const SvgWineBottle1 = () => {
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //       preserveAspectRatio: "xMidYMid slice"
    //     }
    //   };

    const styles = {
        width : '800px',
        height : '800px',
        border : '1px solid green',
        padding : '0px'
    }
    return ( 
        <div className='container SvgWineBottle1'>
             <Lottie animationData={groovyWalkAnimation} autoSize resizeMode="cover" loop={true} height={400} width={400} style={styles} />
      </div>
     );
}
 
export default SvgWineBottle1;