import React, { useState, useSyncExternalStore,useMemo, useCallback } from 'react'
import CounterLinks from './CounterLinks'
import CounterInfo from './CounterInfo'
function Counter() {
    const [count, setCount] = useState<number>(0)
    const [firstLink, setFirstLink] = useState<string>("React")
    const [secondLink, setSecondLink] = useState<string>("Vite")
    const links = useMemo(()=>({
        firstLink,secondLink
    }),[firstLink,secondLink]) 

    const handleClick = () => {
        setCount(value => value + 1)
    }
    const reset = useCallback(()=>{
        setCount(0)
    },[setCount]) 
    return (
        <div>
            <CounterLinks links = {links} reset={reset}/>
            <CounterInfo count={count} />
            <button  onClick={handleClick}>Increment!</button>
        </div>
    )
}

export default Counter
{/* <h1 className='text-5xl text-amber-300 font-bold text-center mt-28 p-8'>Hello world</h1>
<button className='px-8 py-2 rounded-4xl block mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-linear-to-r/srgb hover:from-amber-400 hover:via-amber-600 ] hover:to-amber-400'>Button</button>
<div className='flex gap-10'>
  <div className='bg-blue-500 mt-3 w-24 h-32'>width&height</div>
  <div className='bg-blue-500 mt-3 w-24 h-32'>width&height</div>
</div>
<div className='mt-4 flex justify-center'>
<button
className={`w-25 h-12 border-1 border-amber-50 rounded-2xl relative ${toggle?`bg-green-500`:`bg-gray-700`} transition-colors duration-500`}
onClick={handleSetToggle}
>
<div
  className={`bg-white  w-6 h-6 rounded-2xl absolute top-1/2 transform -translate-y-1/2 transition-[left] duration-500 ease-in-out ${toggle?`left-[60%]`:`left-[10%]`}`}
></div>
</button>
</div> */}
