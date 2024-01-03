import React from 'react';
import MyCalendar from './MyCalendar';
import UserInitials from './UserInitials';

function HomeScreen() {
  const userName = 'John Doe';
  return (
    <>
      <UserInitials userName={userName}/>
      <div className="calendar-container">
        <MyCalendar />
      </div>
    </>
  )
}

export default HomeScreen;