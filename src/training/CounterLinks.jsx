import React from 'react'
import {memo} from 'react'
const CounterLinks = memo(function CounterLinks(props) {
    console.log("rerender CounterLinks")
  return (
    <div>
        <a href='reactjs.org'>{props.links.firstLink} </a>
        <a href='vitejs.dev'>{props.links.secondLink}</a>
        <button onClick = {props.reset} >
            Reset
        </button>
    </div>
  )
})

export default CounterLinks
