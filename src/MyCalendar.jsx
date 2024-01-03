import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import fetchEvents from './fetchEvents'; // Adjust the path as necessary
import fetchUnavailable from './fetchUnavailable';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [allData, setAllData] = useState([]);

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

  return (
    <DnDCalendar
      localizer={localizer}
      events={allData}
      style={{ height: "100vh" }}
      eventPropGetter={eventStyleGetter}
    />
  );
};

export default MyCalendar;

