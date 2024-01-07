
import React, { useState } from 'react'
import robot1 from "../utils/robot1.png"
import robot2 from "../utils/robot2.png"
import ChatArea from './ChatArea'

const Body = () => {
  const [state, setState] = useState('welcome')
  return (
    <>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div className='container1'>
        {/* image */}
        {
          state === "welcome" ?
            <>
              <img className='robotimg' src={robot1} alt='' />
            </>
            :
            <>
              <img className='robotimg' src={robot2} alt='' />
            </>
        }

        {/* chat area */}
        <ChatArea changestate={setState} />
      </div>
    </>
  )
}

export default Body
