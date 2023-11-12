"use client"
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {addDays} from "date-fns"
import {DateRangePicker} from "react-date-range"
const DatePicker = ({state ,dateChangeCallback }:{state :any , dateChangeCallback:(data:any)=>void}) => {
   
  return (
    <div>
        <DateRangePicker
        onChange={dateChangeCallback}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction='horizontal'
        />
    </div>
  )
}

export default DatePicker