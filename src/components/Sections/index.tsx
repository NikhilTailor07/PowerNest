import React from 'react'
import ProfileCompletion from './ProfileComplection'
import TaskCalendar from './TaskCalendar'
import JobHiring from './JobHiring'
const index = () => {
  return (
    <>
    <section className="p-4"
    style={{
    borderColor: 'var(--stroke-color)',
  }}>
    <ProfileCompletion percentage={72} />
  </section>

  {/* Calendar */}
  {/* <section className="  ">
    <TaskCalendar />
  </section> */}
   <div className="flex flex-col items-center p-2"> {/* Added a wrapper for overall layout */}
      <TaskCalendar />
      <JobHiring /> {/* Render the JobHiringSection below the calendar */}
    </div>
  </>
  )
}

export default index;