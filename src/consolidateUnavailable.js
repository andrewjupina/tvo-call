function consolidateUnavailable(events) {
  const consolidated = {};
  const otherEvents = []; // To keep track of events not of type 'unavailable'

  events.forEach(event => {
    if (event.type === 'unavailable') {
      const key = `${event.start}-${event.end}`;
      if (consolidated[key]) {
        consolidated[key].names.push(event.name);
      } else {
        consolidated[key] = {
          ...event,
          names: [event.name]
        };
        // Remove the 'name' property as we now use 'names' for consolidation
        delete consolidated[key].name;
      }
    } else {
      // If event is not of type 'unavailable', add it to otherEvents
      otherEvents.push(event);
    }
  });

  // Convert the consolidated object back into an array and merge with otherEvents
  const consolidatedArray = Object.values(consolidated).map(item => ({
    ...item,
    name: item.names.join(', '), // Join all names into a single string or handle as needed
    type: 'unavailable' // Ensure the type is set correctly
  }));

  return [...otherEvents, ...consolidatedArray];
}

export default consolidateUnavailable;