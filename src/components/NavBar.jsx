import { useState, useEffect } from 'react';
import { MdOutlineQuestionMark } from "react-icons/md";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [remainingTime, setRemainingTime] = useState('');
  useEffect(() => {
    if(remainingTime === '00:00:00') localStorage.clear();
    const updateRemainingTime = () => {
      const currentTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
      });
      const endTime = new Date(currentTime);
      endTime.setHours(24, 0, 0, 0);
      const timeDifference = endTime - new Date(currentTime);
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setRemainingTime(formattedTime);
    };
    const timerID = setInterval(updateRemainingTime, 1000);
    updateRemainingTime();
    return () => clearInterval(timerID);
  }, []);

  return (
    <nav className="flex justify-between items-center py-4 px-8 md:px-20 lg:px-60 bg-white text-gray-900">
      <div className="logo">
      <h1 className="text-3xl font-bold flex items-center">
        <Link to='/'><img src="https://img.icons8.com/external-yogi-aprelliyanto-detailed-outline-yogi-aprelliyanto/64/external-cricket-sport-and-game-yogi-aprelliyanto-detailed-outline-yogi-aprelliyanto.png" alt="CrickIt Logo" className="h-6 md:h-8 lg:h-10 mr-2" /> </Link>
        <span className=' hidden sm:block'>CricQuest</span>
      </h1>
      </div>
      <div className="links flex items-center gap-4 md:gap-8">
        <span className="hidden sm:inline ">{remainingTime} </span>
        <span className="hidden sm:inline "> | </span>
        
        <span><Link to="/play" className="text-gray-900">Play</Link></span>
        <span><Link to="/about" className="text-gray-900">
        <MdOutlineQuestionMark className="rounded-full border-2 border-gray-900 " />
      </Link></span>
      </div>
    </nav>
  );
};

export default NavBar;
