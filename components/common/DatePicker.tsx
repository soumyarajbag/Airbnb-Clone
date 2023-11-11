import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {addDays} from "date-fns"
import {DateRangePicker} from "react-date-range"
const DatePicker = () => {
    const [state , setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key:"selection"
        }
    ])
    const handleDateChange=(date:any)=>{
        setState([date.selection])
    }
  return (
    <div>
        <DateRangePicker
        onChange={()=>{}}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction='horizontal'
        />
    </div>
  )
}

export default DatePicker