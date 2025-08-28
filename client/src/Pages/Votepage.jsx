import React from 'react';
import Checkbox from '../Components/Vote-Components/Checkbox';
import Button from '../Components/Button'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // to get ID from the URL
import Progressbar from '../Components/Progressbar';
import Sharelink from '../Components/Vote-Components/Sharelink';
import dayjs from 'dayjs';
import CountDown from '../Components/Vote-Components/CountDown';
import socket from '../utils/socket';
// import {useCurrentUser} from '../hooks/useCurrentUser';

const Votepage = () => {
  // API URL FOR BACKEND REQUESTS
 const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // poll ID from the route
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContestantId, setSelectedContestantId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false)
  const [votingClosed, setVotingClosed] = useState(false);
  // const [validUser, setValidUser] = useState(null);


  // Fetch the poll details
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getpolldetails/${id}`);
        setPoll(response.data.poll);
        setVotingClosed(response.data.isVotingClosed);
        console.log(response.data);
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
      setVotingClosed(updatedPoll.data.isVotingClosed)
        // if voting is succesfull
        // localStorage.setItem(`hasVoted_${poll._id}`, 'true');
        localStorage.setItem(`hasVoted_${id}`, 'true');
        setHasVoted(true);
      // console.log("Vote successful:", response.data);
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
// Listen for real-time poll updates
useEffect(() => {
  const handlePollUpdate = ({ pollId, contestantId, newVoteCount }) => {
    if (pollId === poll?._id) {
      console.log("Received poll update via socket");
      setPoll((prevPoll) => {
        if (!prevPoll) return prevPoll;
        const updatedContestants = prevPoll.contestants.map((contestant) => {
          if (contestant._id === contestantId) {
            return { ...contestant, votes: newVoteCount };
          }
          return contestant;
        });
        return { ...prevPoll, contestants: updatedContestants };
      });
    }
  };

  socket.on('pollUpdated', handlePollUpdate);

  // Cleanup
  return () => {
    socket.off('pollUpdated', handlePollUpdate);
  };
}, [poll?._id]);
// Display the countDown for Each vote

if (loading) return (
  <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center'>
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
      <Progressbar/>
    </div>
  </div>
);


if (!poll) return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
      <p className="text-gray-600 text-lg">No poll found.</p>
    </div>
  </div>
);
if (votingClosed) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Voting Results</h1>
                <p className="text-orange-100">Thank you for participating!</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <Sharelink pollId={poll._id} />
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <CountDown id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 p-8">
          <ul className="grid gap-6">
            {poll.contestants.map((contestant, index) => (
              <li
                key={index}
                className="group relative overflow-hidden bg-gradient-to-r from-white to-orange-50 hover:from-orange-50 hover:to-amber-50 border border-orange-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6">
                  <div className="relative flex-shrink-0 self-center sm:self-auto">
                    <img
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-orange-200 shadow-md group-hover:border-orange-300 transition-colors duration-300"
                      src={contestant.picture || 'https://via.placeholder.com/80'}
                      alt={contestant.name}
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-amber-400 text-white text-xs font-bold rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center shadow-lg">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {contestant.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {contestant.about}
                    </p>
                  </div>

                  <div className="text-center bg-gradient-to-br from-orange-400 to-amber-400 text-white rounded-xl p-3 sm:p-4 shadow-lg min-w-[80px] sm:min-w-[100px] self-center">
                    <div className="text-xl sm:text-2xl font-bold mb-1">{contestant.votes}</div>
                    <div className="text-xs sm:text-sm text-orange-100">
                      vote{contestant.votes !== 1 && 's'}
                    </div>
                  </div>
                </div>

                {/* Decorative accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
    {hasVoted ? (
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Voting Results</h1>
                  <p className="text-orange-100">Thank you for participating!</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <Sharelink pollId={poll._id} />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <CountDown id={id}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 p-8">
            <ul className="grid gap-6">
              {poll.contestants.map((contestant, index) => (
                <li key={index} className="group relative overflow-hidden bg-gradient-to-r from-white to-orange-50 hover:from-orange-50 hover:to-amber-50 border border-orange-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6">
                    <div className="relative flex-shrink-0 self-center sm:self-auto">
                      <img
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-orange-200 shadow-md group-hover:border-orange-300 transition-colors duration-300"
                        src={contestant.picture || 'https://via.placeholder.com/80'}
                        alt={contestant.name}
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-amber-400 text-white text-xs font-bold rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center shadow-lg">
                        #{index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300  ">
                        {contestant.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{contestant.about}</p>
                    </div>
                    
                    <div className="text-center bg-gradient-to-br from-orange-400 to-amber-400 text-white rounded-xl p-3 sm:p-4 shadow-lg min-w-[80px] sm:min-w-[100px] self-center">
                      <div className="text-xl sm:text-2xl font-bold mb-1">{contestant.votes}</div>
                      <div className="text-xs sm:text-sm text-orange-100">
                        vote{contestant.votes !== 1 && 's'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-6">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-3">{poll.name}</h1>
                  <p className="text-orange-100 text-lg leading-relaxed">{poll.about}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <Sharelink pollId={poll._id} />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <CountDown id={id}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voting Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">
                Vote for a Contestant
              </h2>
              <p className="text-gray-600">Choose your favorite contestant to cast your vote</p>
            </div>

            <ul className="grid gap-6 mb-8">
              {poll.contestants.map((contestant, index) => (
                <li key={index} className="group relative overflow-hidden bg-gradient-to-r from-white to-orange-50 hover:from-orange-50 hover:to-amber-50 border-2 border-orange-200 hover:border-orange-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6">
                    <div className="relative flex-shrink-0 self-center sm:self-auto">
                      <img
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-orange-200 shadow-md group-hover:border-orange-300 transition-colors duration-300"
                        src={contestant.picture || 'https://via.placeholder.com/80'}
                        alt={contestant.name}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {contestant.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{contestant.about}</p>
                    </div>
                    
                    <div className="radiobtn flex-shrink-0 self-center">
                      <div className="bg-white rounded-full p-2 shadow-md border-2 border-orange-200">
                        <Checkbox
                          checked={selectedContestantId === contestant._id || false}
                          onChange={() => {
                            setSelectedContestantId(contestant._id);
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Selection indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300 ${
                    selectedContestantId === contestant._id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></div>
                </li>
              ))}
            </ul>

            {/* Vote Button */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-orange-400 to-amber-400 p-1 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-white rounded-xl px-8 py-3">
                  <Button text={"Place Vote"} onClick={submitVote}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default Votepage