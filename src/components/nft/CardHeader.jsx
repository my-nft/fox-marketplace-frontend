import { useEffect, useState } from "react";

const CardHeader = ({endDate}) => {

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
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
    }
    return timeLeft;
  }

  useEffect(() => {
    let timer;
    if(endDate){
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
      }, 1000)
      if(timeLeft.seconds === 0 && timeLeft.minutes === 0 && timeLeft.hours === 0 && timeLeft.days === 0){
        clearInterval(timer);
      }
      
    }

    return () => {
      clearInterval(timer);
    }
    
    
  }, [endDate])

  

  return (
    <div class="card-header">
      <p class="text-center pb-3">
        Sale ends {saleEndDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} at 23:59pm GMT+1
      </p>
      <div class="countdown">
        <div class="countdown__days">
          <div class="number">
            {daysLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            })}
          </div>
          <span class>Days</span>
        </div>

        <div class="countdown__hours">
          <div class="number">
          {hoursLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            })}
          </div>
          <span class>Hours</span>
        </div>

        <div class="countdown__minutes">
          <div class="number">
          { minutesLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            })}
          </div>
          <span class>Minutes</span>
        </div>

        <div class="countdown__seconds">
          <div class="number">
          {secondsLeft.toLocaleString("en-US", {
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
