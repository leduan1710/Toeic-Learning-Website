import React from 'react'
import AboutCard from './AboutHome/AboutCard'
import LRCard from './L&RHome/LRCard'
import Intro from './Intro/Intro'
import TestHome from './TestHome/TestHome'


function Home() {
  return (
    <div>
      <AboutCard/>
      <Intro/>
      <LRCard/>
      <TestHome/>
    </div>
  )
}

export default Home
