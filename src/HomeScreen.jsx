import React from 'react';
import MyCalendar from './MyCalendar';
import LogoutButton from './LogoutButton';
import UpdateDisplayName from './UpdateDisplayName';

function HomeScreen() {
  return (
    <>
      <LogoutButton />
      <UpdateDisplayName />
      <div className="calendar-container">
        <MyCalendar />
      </div>
    </>
  )
}

export default HomeScreen;