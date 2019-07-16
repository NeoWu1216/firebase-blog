import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'

const backgroundStyle = {
  position: "fixed",
  width: "100vw",
  height : "100vh",
  top: 0,
  left: 0,
  zIndex: -100,
}

const image = require('../img/texture.jpg')

export default () => (<Image src={image} style={backgroundStyle}/>)