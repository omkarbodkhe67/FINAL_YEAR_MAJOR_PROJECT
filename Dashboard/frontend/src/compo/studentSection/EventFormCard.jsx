import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventFormCard = ({ eventData, onChange, onSubmit }) => {
  const fields = [
    ["eventName", "Event Name"],
    ["organizerName", "Organizer Name"],
    ["eventPlace", "Event Place"],
    ["eventLevel", "Event Level (college/state/national/international)"],
    ["eventType", "Event Type (Technical/Cultural/Sports)"],
    ["fromDate", "From Date"],
    ["toDate", "To Date"],
    ["academicYear", "Academic Year"],
  ];

  return (
    <Card className="p-6 shadow-md">
      <CardContent>
        <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">
          🎉 Event Participation Form
        </h3>
        <form onSubmit={onSubmit}>
          {fields.map(([name, label]) => (
            <div key={name} className="mb-4">
              <label className="font-medium block mb-1">{label}:</label>
              <input
                type={name.includes("Date") ? "date" : "text"}
                name={name}
                value={eventData[name]}
                onChange={onChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="font-medium block mb-1">
              Certificate Upload (PDF only):
            </label>
            <input
              type="file"
              name="certificate"
              accept="application/pdf"
              onChange={onChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <Button type="submit" className="bg-blue-600 text-white px-6 py-2">
            🚀 Submit Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventFormCard;
