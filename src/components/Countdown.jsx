import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime, Interval } from "luxon";

const Countdown = ({ date, endMessage = "Mint your NFT", link = "#" }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let mintDate = DateTime.fromISO(date);

  const calculateTimeLeft = () => {
    let difference = Interval.fromDateTimes(DateTime.local(), mintDate);

    let timeLeft = {
      days: parseInt(difference.length("days")),
      hours: parseInt(difference.length("hours") % 24),
      minutes: parseInt(difference.length("minutes") % 60),
      seconds: parseInt(difference.length("seconds") % 60),
    };

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
      setMinutes(parseInt(timeLeft.minutes));
      setSeconds(parseInt(timeLeft.seconds));
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
        <Link className="mintUpcoming" to={link}>
          {endMessage}
        </Link>
      )}
    </div>
  );
};

export default Countdown;
