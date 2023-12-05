import React from 'react'
import TestList from './TestList'
import TestHome from "../Home/TestHome/TestHome"

function TestIndex() {
  return (
    <div className='test-index-wrapper'>
      <TestList testType={"MiniTest"}/>
      <TestList testType={"FullTest"}/>
      <TestHome subtitle="" title="Thực hiện các bài thi TOEIC"/>
    </div>
  )
}

export default TestIndex
