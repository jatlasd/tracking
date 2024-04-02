import React from 'react'
import TrendsSelectedDayOrRange from './TrendsSelectedDayOrRange'

const TrendsContainer = ({type}) => {
  return (
    <div className="flex px-10">
      <TrendsSelectedDayOrRange type={type} />
    </div>  )
}

export default TrendsContainer