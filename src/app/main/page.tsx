import React from 'react'
import Carousele from '../_componets/Curosules'
import SmallCarousel from '../_componets/SmallCurosules'
import Header from '../_componets/Header'


function page() {
  return (
    <div className='min-w-[370px]'>
      <Header/>
     
      
      <Carousele/>
      <SmallCarousel/>
    </div>
  )
}

export default page
