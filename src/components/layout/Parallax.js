import React from 'react'
import Img from 'react-image'

export default () => {
  return (
    // parallax not working greatly, decide to just use normal images

    //<div className="parallax-container" style={{marginTop:"12ex"}}>
    //      <div className="parallax" >
          <img src={getRandomImage()}  style={{marginTop:"10ex", marginBottom:"-1ex", width:"100%", height:"auto"}}/>
    //       </div>
    //</div>
  )
}

function getRandomImage() {
    const images = [
    require('../img/background.jpg'),
    require('../img/Doraemon.jpg'),
    require('../img/island.jpg'),
    require('../img/doge.jpg'),
    require('../img/japan-scene.jpg'),
    require('../img/spirited_away.jpeg'),
    require('../img/eiffel.jpg'),
    ];
    // var num = 0;
    var num = Math.floor( Math.random() * images.length );
    return images[num];
}