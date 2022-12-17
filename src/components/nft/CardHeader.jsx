import { useEffect, useState } from "react";

const CardHeader = ({ endDate }) => {
  const [saleEndDate, _] = useState(new Date(endDate));
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const computeTimeLeft = () => {
    let timeLeft = {};
    if (endDate) {
      const difference = saleEndDate - new Date();
      if (difference > 0) {
        var seconds = Math.floor(difference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours = hours - days * 24;
        minutes = minutes - days * 24 * 60 - hours * 60;
        seconds =
          seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

        timeLeft = {
          days,
          hours,
          minutes,
          seconds,
        };
      }
    }
    return timeLeft;
  };

  useEffect(() => {
    let timer;
    if (endDate) {
      let timeLeft = computeTimeLeft();
      setDaysLeft(timeLeft.days);
      setHoursLeft(timeLeft.hours);
      setMinutesLeft(timeLeft.minutes);
      setSecondsLeft(timeLeft.seconds);
      timer = setInterval(() => {
        timeLeft = computeTimeLeft();
        setDaysLeft(timeLeft.days);
        setHoursLeft(timeLeft.hours);
        setMinutesLeft(timeLeft.minutes);
        setSecondsLeft(timeLeft.seconds);
      }, 1000);
      if (
        timeLeft.seconds === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.days === 0
      ) {
        clearInterval(timer);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [endDate]);

  return (
    <div className="card-header">
      <p className="text-center pb-3">
        Sale ends{" "}
        {saleEndDate.toLocaleString([], {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}{" "}
      </p>
      <div className="countdown">
        <div className="countdown__days">
          <div className="number">
            {daysLeft?.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}
          </div>
          <span class>Days</span>
        </div>

        <div className="countdown__hours">
          <div className="number">
            {hoursLeft?.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}
          </div>
          <span class>Hours</span>
        </div>

        <div className="countdown__minutes">
          <div className="number">
            {minutesLeft?.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}
          </div>
          <span class>Minutes</span>
        </div>

        <div className="countdown__seconds">
          <div className="number">
            {secondsLeft?.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}
          </div>
          <span class>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
