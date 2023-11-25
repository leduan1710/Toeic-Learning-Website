import React from 'react'
import TestList from './TestList'

function TestIndex() {
  return (
    <div>
      <TestList testType={"miniTest"}/>
      <TestList testType={"fullTest"}/>
    </div>
  )
}

export default TestIndex
