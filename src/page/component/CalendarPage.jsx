import { Calendar } from "../../components/ui/calendar";
import React, { useEffect, useState } from "react";
import AddEvent from "./AddEvent";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isfetched, setIsFetched] = useState(false);

  //To add an event
  const handleAddEvent = (newEvent) => {
    if (!selectedDate) {
      alert("Please select a date before adding an event.");
      return;
    }
    const dateKey = selectedDate.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), newEvent],
    }));
  };

  //To delete an event
  const handleDelete = (dateKey, eventIndex) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[dateKey] = updatedEvents[dateKey].filter((_, index) => {
        index !== eventIndex;
      });
      if (updatedEvents[dateKey].length == 0) {
        delete updatedEvents[dateKey];
      }
      return updatedEvents;
    });
  };

  //To save an event
  useEffect(() => {
    const storeEvents = localStorage.getItem("events");
    if (storeEvents) {
      setEvents(JSON.parse(storeEvents));
      setIsFetched(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events,isfetched]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-400">
      <h1 className="text-xl font-bold mb-4">My Calendar</h1>
      <Calendar
        select={selectedDate}
        onSelect={setSelectedDate}
        mode="single"
        className="w-full max-w-md border rounded-lg"
      />
      {selectedDate && (
        <div className="mt-4 text-center">
          <p>
            Selected Date: <strong>{selectedDate.toLocaleDateString()}</strong>
          </p>
          {isfetched ? (
            <div className="mt-2">
              {events[selectedDate.toDateString()] ? (
                events[selectedDate.toDateString()].map((events, index) => (
                  <div key={index} className="p-2 border rounded mb-2 bg-white">
                    <h3 className="font-bold">{events.eventName}</h3>
                    <p>
                      {events.startTime} - {events.endTime}
                    </p>
                    <p>{events.description}</p>
                    <button
                      onClick={() =>
                        handleDelete(selectedDate.toDateString(), index)
                      }
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No events for this date.</p>
              )}
            </div>
          ) : (
            "...Loading"
          )}
        </div>
      )}
      <AddEvent onSave={handleAddEvent} />
    </div>
  );
};

export default CalendarPage;
