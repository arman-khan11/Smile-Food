"use client"
import { Button } from '@/components/ui/button';

import React, { useState } from 'react';


function AnimatedSearchBar() {

  const [location, setlocation] = useState({state:""})
  const handelChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

    setlocation({...location, state:e.target.value})
    console.log(location)
  }

   
  return (
   <div className='flex'>
    <div className='bg-gray-200 w-fit h-9  flex items-center  rounded-l-lg '> 
      <input type="search" 
      onChange={handelChange}
      className='bg-transparent outline-none
      text-black p-4 w-[30vw]'
      placeholder='search your city '
      />
    </div>
      <Button  className='bg-red-600 rounded-l-none'>
        Search
      </Button>
   </div>
     
  );
}

export default AnimatedSearchBar;
