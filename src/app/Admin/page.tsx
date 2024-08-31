import React from 'react';


export default async function Page() {
  
  return (
    <div className=' flex flex-row  p-4'>
      <button className='p-4 border-2 bg-slate-400 hover:bg-slate-200' >
        <a href="/adminOnly/addAircraft">Add Aircraft</a>
      </button>
      <button className=' p-4 border-2 bg-slate-400 hover:bg-slate-200'>
        <a href="/adminOnly/addairport">Add airport</a>
      </button>
      <button className=' p-4 border-2 bg-slate-400 hover:bg-slate-200'>
        <a href="/adminOnly/showFlightSchedules">Add Flight</a>
      </button>
      <button className='p-4 border-2 bg-slate-400 hover:bg-slate-200 '>
        <a href="/adminOnly/addFlightSchedule">Add Flight Schedule</a>
      </button>
    </div>
  );
}
