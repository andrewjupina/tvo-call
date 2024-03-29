import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import fetchEvents from './fetchEvents'; // Adjust the path as necessary
import fetchUnavailable from './fetchUnavailable';
import UnavailableSubmit from './UnavailableSubmit';
import EventEditForm from './EventEditForm';
import { getAuth } from "firebase/auth";

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [allData, setAllData] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchData = async () => {
    const fetchedEvents = await fetchEvents();
    const fetchedUnavailable = await fetchUnavailable();

    let combinedData = [
      ...fetchedEvents.map(event => ({ ...event, type: 'event' })),
      ...fetchedUnavailable.map(item => ({ ...item, type: 'unavailable' })),
    ];

    setAllData(combinedData);
    setSelectedDays([]);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (updatedEvent) => {
    // Here, you would handle updating the event information in your events state
    console.log("Save changes to event:", updatedEvent);
    // For simplicity, this example logs the updated event. Implement the logic to update your state or backend here.
    setOpen(false);
  };


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
        onSelectEvent={handleEventSelect}
      />
      <UnavailableSubmit
        selectedDays={selectedDays}
        displayName={user.displayName}
        onSubmit={fetchData}
      />
      <EventEditForm
        open={open}
        handleClose={handleClose}
        event={selectedEvent}
        handleSave={handleSave}
      />
    </div>
);
};

export default MyCalendar;