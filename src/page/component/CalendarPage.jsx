import { Calendar } from "../../components/ui/calendar";
import React, { useState } from "react";
import AddEvent from './AddEvent'



const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-400">
      <h1 className="text-xl font-bold mb-4">My Calendar</h1>
      <Calendar
        select = {selectedDate}
        onSelect = {setSelectedDate}
        mode = "single"
        className="w-full max-w-md border rounded-lg"
      />
      {selectedDate && (
        <div className="mt-4 text-center">
          <p>
            Selected Date:{" "}
            <strong>{selectedDate.toLocaleDateString()}</strong>
          </p>
        </div>
      )}
      <AddEvent/>
    </div>
  );
};

export default CalendarPage;
