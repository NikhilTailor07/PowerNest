// src/components/TaskCalendar.jsx
import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO,
} from 'date-fns';

const TaskCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // CHANGE 1: selectedDate is now an array
  const [selectedDates, setSelectedDates] = useState([]);

  // Dummy task data (replace with your actual data fetching)
  const [tasks, setTasks] = useState([
    { id: 1, date: '2025-03-15', description: 'Review Q1 Investor Report' },
    { id: 2, date: '2025-03-16', description: 'Advisor Meeting' },
    { id: 3, date: '2025-03-17', description: 'Job Interview - Candidate A' },
    { id: 4, date: '2025-03-24', description: 'Team Standup' },
    { id: 5, date: '2025-03-08', description: 'Prepare Marketing Plan' },
    { id: 6, date: '2025-03-18', description: 'Project Deadline' },
    { id: 7, date: '2025-03-19', description: 'Client Call' },
    // Add more dummy tasks as needed
  ]);

  // Dummy progress data (could also be dynamic based on task completion)
  const progressData = [
    { label: 'Investors', percentage: 40 },
    { label: 'Advisor', percentage: 24 },
    { label: 'Job', percentage: 47 },
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Helper function to check if a date is in the selectedDates array
  const isDateSelected = (date) => {
    return selectedDates.some(selected => isSameDay(selected, date));
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day; // Preserve the current day in the loop

        // Check if the current day has any tasks
        const hasTask = tasks.some(task =>
          isSameDay(parseISO(task.date), cloneDay)
        );

        // Check if the current day is one of the selected dates
        const isCurrentDaySelected = isDateSelected(cloneDay);

        days.push(
          <div
            key={cloneDay.toISOString()} // Use ISO string for unique key
            className={`
              relative w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ease-in-out
              ${
                !isSameMonth(cloneDay, currentMonth)
                  ? 'opacity-30 text-gray-400' // Dates from previous/next month
                  : isCurrentDaySelected
                  ? 'bg-blue-600 text-white shadow-lg' // Selected date
                  : 'text-gray-200 hover:bg-gray-700' // Normal date
              }
            `}
            onClick={() => onDateClick(cloneDay)}
          >
            {formattedDate}
            {hasTask && (
              <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-4 mb-2" key={day.toISOString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  // CHANGE 2: Modify onDateClick to handle array
  const onDateClick = (day) => {
    if (isDateSelected(day)) {
      // If already selected, remove it
      setSelectedDates(selectedDates.filter(selected => !isSameDay(selected, day)));
    } else {
      // If not selected, add it
      setSelectedDates([...selectedDates, day]);
    }
    // You might still want to do something with the *clicked* day
    // For example, display its tasks immediately if only one day is clicked.
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen font-sans rounded-lg shadow-xl max-w-lg mx-auto my-2"
      style={{
     background: 'linear-gradient(to bottom,rgb(0, 0, 0),rgb(11, 15, 90))', // This line applies the gradient
  }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold">Task Calendar</h2>
        <div className="flex items-center text-gray-400 relative">
          {/* Month Navigation */}
          <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-700 mr-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <span className="text-sm font-medium text-white mr-2">
            {format(currentMonth, 'MMMM yyyy')} {/* Corrected format for year */}
          </span>
          <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-around mb-8 border-b border-gray-700 pb-1">
        {progressData.map((item, index) => (
          <div key={index} className="text-center">
            <p
              className="text-2xl text-white  mb-1"
            //   style={{
            //     background: 'linear-gradient(to right, #007bff, #6a0dad)', // Custom gradient
            //     WebkitBackgroundClip: 'text',
            //     WebkitTextFillColor: 'transparent',
            //   }}
            >
              {item.percentage}%
            </p>
            <p className="text-gray-400 mb-2 text-sm">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 text-center mb-4">
        {/* Days of Week Header */}
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-gray-400 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>
      {renderDays()}

      {/* Display tasks for ALL selected dates */}
      {selectedDates.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-800">
          <h3 className="text-xl font-semibold mb-2">
            Tasks for Selected Dates:
          </h3>
          <ul className="space-y-2">
            {selectedDates.sort((a,b) => a - b).map(selectedDay => { // Sort for consistent display
              const tasksForDay = tasks.filter(task =>
                isSameDay(parseISO(task.date), selectedDay)
              );

              return (
                <li key={selectedDay.toISOString()} className="bg-gray-800 p-3 rounded-md">
                  <strong className="text-blue-400">{format(selectedDay, 'PPP')}</strong>
                  {tasksForDay.length > 0 ? (
                    <ul className="list-disc list-inside ml-2 text-sm text-gray-300">
                      {tasksForDay.map(task => (
                        <li key={task.id}>{task.description}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm italic ml-2">No tasks for this day.</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;