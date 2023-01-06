import { useEffect, useState } from "react";

const Countdown = ({ date, endMessage = "Mint your NFT" }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const calculateTimeLeft = () => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    let timeLeft = calculateTimeLeft();
    setDays(timeLeft.days);
    setHours(timeLeft.hours);
    setMinutes(timeLeft.minutes);
    setSeconds(timeLeft.seconds);
    const timer = setTimeout(() => {
      timeLeft = calculateTimeLeft();
      setDays(timeLeft.days);
      setHours(timeLeft.hours);
      setMinutes(timeLeft.minutes);
      setSeconds(timeLeft.seconds);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const toDoubleDigits = (num) => {
    return ("0" + num).slice(-2);
  };

  return (
    <div className="countdown">
      {days || hours || minutes || seconds ? (
        <div className="countdown_wrapper">
          <div className="countdown_item">
            {toDoubleDigits(days)}
            <span>Days</span>
          </div>
          <div className="countdown_item">
            {toDoubleDigits(hours)}
            <span>Hours</span>
          </div>
          <div className="countdown_item">
            {toDoubleDigits(minutes)}
            <span>Minutes</span>
          </div>
          <div className="countdown_item">
            {toDoubleDigits(seconds)}
            <span>Seconds</span>
          </div>
        </div>
      ) : (
        <span className="mintUpcoming">{endMessage}</span>
      )}
    </div>
  );
};

export default Countdown;
