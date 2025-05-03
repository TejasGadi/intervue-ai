import React, { useState, useEffect } from 'react';

interface TimeComponentProps {
  isRunning: boolean;
}

const TimeComponent: React.FC<TimeComponentProps> = ({ isRunning }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      // Increment every second while running
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  // Convert total seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <span className="flex gap-2 items-center">
      {formatTime(secondsElapsed)}
    </span>
  );
};

export default TimeComponent;
