import React from 'react';
import Checkbox from '../Components/Vote-Components/Checkbox';
import Button from '../Components/Button'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // to get ID from the URL

const Votepage = () => {
  // API URL FOR BACKEND REQUESTS
 const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // poll ID from the route
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getpolldetails/${id}`);
        setPoll(response.data);
      } catch (err) {
        console.error("Error fetching poll:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPoll();
    }
  }, [id, apiUrl]);

  if (loading) return <p>Loading poll details...</p>;
  if (!poll) return <p>No poll found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="">
              <h1 className="text-2xl font-bold mb-4">{poll.name}</h1>
      <p className="mb-6 text-gray-700">{poll.about}</p>

      <h2 className="text-xl font-semibold mb-4">Vote for a contestant</h2>
      <ul className="grid gap-4">
        {poll.contestants.map((contestant, index) => (
          <li key={index} className="flex items-center justify-between gap-4 bg-white shadow p-4 rounded-lg">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={contestant.picture || 'https://via.placeholder.com/64'}
              alt={contestant.name}
            />
            <div>
              <p className="text-lg font-medium">{contestant.name}</p>
              <p className="text-gray-600 text-sm">{contestant.about}</p>
            </div>
            <div className="radiobtn">
              <Checkbox/>
            </div>
          </li>
        ))}
      </ul>
      <div className="button m-3 p-3">
        <Button text={"place vote"}/>
      </div>
      </div>

    </div>
  );
}

export default Votepage