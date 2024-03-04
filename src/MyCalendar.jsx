import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import fetchEvents from './fetchEvents'; // Adjust the path as necessary
import fetchUnavailable from './fetchUnavailable';
import UnavailableSubmit from './UnavailableSubmit';
import { getAuth } from "firebase/auth";

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [allData, setAllData] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvents = await fetchEvents();
      // console.log('Fetched Events:', fetchedEvents);
      const fetchedUnavailable = await fetchUnavailable();
      // console.log('Fetched Unavailable:', fetchedUnavailable); // Debugging line

      // Add an identifier to each item
      const combinedData = [
        ...fetchedEvents.map(event => ({ ...event, type: 'event' })),
        ...fetchedUnavailable.map(item => ({ ...item, type: 'unavailable' })),
      ];

      setAllData(combinedData);
    };

    fetchData();
  }, []);


  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: '#3174ad',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
      whiteSpace: 'normal', // Ensures text wraps instead of staying in a single line
      overflowWrap: 'break-word', // Breaks words to prevent overflow
      lineHeight: '1.2', // Optional, adjusts line height for better readability
      padding: '2px 5px'
    };

    if (event.type === 'unavailable') {
      style.backgroundColor = 'red';
    }

    return {
      style: style
    };
  }

  const onSelectSlot = (slotInfo) => {
    const startOfDayTimestamp = moment(slotInfo.start).startOf('day').valueOf(); // This gives you a Unix timestamp in milliseconds

    setSelectedDays(prev => {
      // Check if the timestamp is already in the array
      if (prev.includes(startOfDayTimestamp)) {
        // If it is, remove it (deselect the day)
        return prev.filter(timestamp => timestamp !== startOfDayTimestamp);
      } else {
        // Otherwise, add it to the array (select the day)
        return [...prev, startOfDayTimestamp];
      }
    });
    console.log(selectedDays);
    console.log(slotInfo);
  };

  const dayPropGetter = (date) => {
    // Convert the date to the start of the day's timestamp to match the selection logic
    const startOfDayTimestamp = moment(date).startOf('day').valueOf();

    // Now, check if this timestamp is included in your selectedDays array
    if (selectedDays.includes(startOfDayTimestamp)) {
      return {
        style: {
          backgroundColor: '#daf7a6', // Change to any color you prefer for selected days
          color: 'black',
        },
      };
    }
  };


  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={allData}
        style={{ height: "100vh" }}
        eventPropGetter={eventStyleGetter}
        selectable={true}
        onSelectSlot={onSelectSlot}
        dayPropGetter={dayPropGetter}
      />
      <UnavailableSubmit
        selectedDays={selectedDays}
        displayName={user.displayName}
      />
    </div>
);
};

export default MyCalendar;