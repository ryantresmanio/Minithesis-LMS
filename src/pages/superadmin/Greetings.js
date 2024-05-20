import React, { useState, useEffect } from 'react';

const Greetings = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 
   
    return () => clearInterval(intervalID);
  }, []); 

  const hour = currentTime.getHours();
  const username = 'Super Admin';
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getGreeting = () => {
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <div className="p-4 m-5 bg-white rounded-lg shadow">
      <div className="flex justify-between">
        <div className="Greetings">
          <p className="text-xl font-semibold pr-4">
            {getGreeting()}, <span className="text-blue">Welcome {username}!👋</span>
          </p>
        </div>
        <div>
          <p className="text-xl font-semibold">
            {currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} |{' '}
            {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}, {formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Greetings;
