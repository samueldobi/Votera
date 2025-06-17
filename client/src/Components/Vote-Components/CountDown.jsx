import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import dayjs from 'dayjs';

const CountDown = ({id}) => {
const [remaining, setRemaining] = useState(0);  // milliseconds left
const [ended, setEnded] = useState(false);
// API URL FOR BACKEND CALLS
const apiUrl = import.meta.env.VITE_API_URL;
useEffect(() => {
  let interval;

  async function setupTimer() {
    const res = await axios.get(`${apiUrl}/getpolldetails/${id}`);
    const end = dayjs(res.data.endDate);

    const tick = () => {
      const diff = end.diff(dayjs());
      if (diff <= 0) {
        setRemaining(0);
        setEnded(true);
        clearInterval(interval);
      } else {
        setRemaining(diff);
      }
    };

    tick();  // initial setup
    interval = setInterval(tick, 1000);
  }

  setupTimer();

  return () => clearInterval(interval);
}, [apiUrl]);

  const totalSec = Math.floor(remaining / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return (
    <div>
           {ended ? (
            <p>Poll ended</p>
          ) : (
            <p>Time left: {days}d {hrs}h {mins}m {secs}s</p>
          )}
    </div>
  )
}

export default CountDown