import React from 'react'
import robot1 from "../utils/robot1.png"
import robot2 from "../utils/robot2.png"
import ChatArea from './ChatArea'

const Body = () => {
  return (
    <div className='container1'>
     {/* image */}
     <img className='robotimg' src={robot1} alt='' />
     {/* chat area */}
     <ChatArea />
    </div>
  )
}

export default Body
