import { BatteryChargingIcon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
    <div className="animate-spin bg-blue-500 h-6 w-2 rounded-full "></div>
    <div className="animate-spin bg-pink-500 h-5 w-2 rounded-full "></div>
    <div className="animate-spin bg-purple-900 h-4 w-2 rounded-full "></div>
    <div className="animate-spin bg-gray-600 h-3 w-2 rounded-full "></div>
    <div className="animate-spin bg-white h-3 w-2 rounded-full "></div>
    <BatteryChargingIcon/>
  </div>
  )
}

export default Loading
