"use client"
import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});
const Counter = ({num}:{num : number}) => {
    const [count, setCount] = useState<boolean>(false);
    useEffect(() => {
        setCount(true)
    },[])
  return (
    <div>
        {count && 
         <AnimatedNumbers
         includeComma
         animateToNumber={num}
         fontStyle={{ fontSize: 40 , fontWeight:"bold" }}
         locale="en-US"
         configs={[
           { mass: 1, tension: 220, friction: 100 },
           { mass: 1, tension: 180, friction: 130 },
           { mass: 1, tension: 280, friction: 90 },
           { mass: 1, tension: 180, friction: 135 },
           { mass: 1, tension: 260, friction: 100 },
           { mass: 1, tension: 210, friction: 180 },
         ]}
       ></AnimatedNumbers> }
    </div>
  )
}

export default Counter