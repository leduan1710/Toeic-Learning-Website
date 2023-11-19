import React from 'react'
import AboutCard from './AboutHome/AboutCard'
import CourseHome from './CourseHome/CourseHome'
import Intro from './Intro/Intro'
import TestHome from './TestHome/TestHome'


function Home() {
  return (
    <div className='container'>
      <AboutCard/>
      <Intro/>
      <CourseHome title="Các khóa học của VictoryU"/>
      <TestHome title="Các đề thi thử bám sát thực tế"/>
    </div>
  )
}

export default Home
