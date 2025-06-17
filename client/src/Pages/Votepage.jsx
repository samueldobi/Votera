import React from 'react';
import Checkbox from '../Components/Vote-Components/Checkbox';
import Button from '../Components/Button'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // to get ID from the URL
import Progressbar from '../Components/Progressbar';
import Sharelink from '../Components/Vote-Components/Sharelink';
import dayjs from 'dayjs';
// import {useCurrentUser} from '../hooks/useCurrentUser';

const Votepage = () => {
  // API URL FOR BACKEND REQUESTS
 const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // poll ID from the route
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContestantId, setSelectedContestantId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false)
  const [validUser, setValidUser] = useState(null);
  const [remaining, setRemaining] = useState(0);  // milliseconds left
  const [ended, setEnded] = useState(false);

  // Fetch the poll details
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getpolldetails/${id}`);
        setPoll(response.data);
        console.log(response.data)
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
// send the result of the vote to the backend
const submitVote = async() =>{
  setHasVoted(true);
    if (!selectedContestantId) {
    alert("Please select a contestant before voting.");
    return;
  }
   try{
      const response = await axios.post(`${apiUrl}/vote`,{
        pollId: id,
        contestantId: selectedContestantId,
      });
      const updatedPoll = await axios.get(`${apiUrl}/getpolldetails/${id}`);
      setPoll(updatedPoll.data)
        // if voting is succesfull
        localStorage.setItem(`hasVoted_${poll._id}`, 'true');
        setHasVoted(true);
      console.log("Vote successful:", response.data);
    }catch(err){
      console.log(err);
    }

}
// Check if the user has voted
useEffect(() => {
  const votedFlag = localStorage.getItem(`hasVoted_${id}`);
  if (votedFlag === 'true') {
    setHasVoted(true);
  }
}, [id]);
// Display the remaining days
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
}, [apiUrl, id]);

  const totalSec = Math.floor(remaining / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;


// check if the user is admin so that he can have a link to share to others
useEffect(() => {
  const checkUser = async ()=>{
    try{
      const response = await axios.get(`${apiUrl}/checkuser`,
        {withCredentials:true}
      )
      if(response.status === 200){
        console.log('it is working now ')
        setValidUser(true);
      }
    }catch(err){
      console.log(err)
    }
  }
  checkUser();
}, []);
// Display the countDown for Each vote

  if (loading) return
  <div className='flex items-center'>
    <Progressbar/>;
  </div> 
  if (!poll) return <p>No poll found.</p>;

  return (
    hasVoted ?(
       <div>
          {/* share the link  */}
          <Sharelink pollId={poll._id} />
          {/* share the link  */}
          <div>
          {ended ? (
            <p>Poll ended</p>
          ) : (
            <p>Time left: {days}d {hrs}h {mins}m {secs}s</p>
          )}
          </div>
         <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4"> Voting Results</h1>
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
            {/* contestant scores */}
            <div>
              <p className="text-lg font-semibold">{contestant.votes} vote{contestant.votes !== 1 && 's'}</p>
            </div>
          </li>
        ))}
      </ul>
         </div>
       </div>
    ) : (
          <div className="max-w-3xl mx-auto px-4 py-8">
             {/* share the link  */}
                <div>
                {validUser &&(
                  <Sharelink pollId={poll._id} /> 
                )}
              </div>
                     {/* share the link  */}
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
              <Checkbox
                checked={selectedContestantId === contestant._id || false}
                onChange={() =>{
                  console.log("Selected contestant ID:", contestant._id);
                  setSelectedContestantId(contestant._id)}
                } 
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="button m-3 p-3">
        <Button text={"place vote"} onClick = {submitVote}/>
      </div>
      </div>

    </div>

    )

  );
}

export default Votepage