import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogDemo({onSave}) {

  const [eventName, setEventName] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (!eventName || !startTime || !endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    if (new Date(`1970-01-01T${startTime}`) >= new Date(`1970-01-01T${endTime}`)) {
      alert("Start time must be before end time.");
      return;
    }

    const newEvent = { eventName, startTime, endTime, description };
    onSave(newEvent); // Pass data to parent component
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("")
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="m-3">Add Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Make your event here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Event Name
            </Label>
            <Input
              id="name"
              type="text"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={eventName}
              onChange={(e)=>{setEventName(e.target.value)}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Start time
            </Label>
            <Input
              id="start-time"
              type="time"
              defaultValue="@peduarte"
              className="col-span-3"
              value={startTime}
              onChange={(e)=>{setStartTime(e.target.value)}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              End time
            </Label>
            <Input
              id="end-time"
              type="time"
              defaultValue="@peduarte"
              className="col-span-3"
              value={endTime}
              onChange={(e)=>{setEndTime(e.target.value)}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              defaultValue="@peduarte"
              className="col-span-3"
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
