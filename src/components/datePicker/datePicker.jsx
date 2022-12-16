import { useState } from "react";
import logo from "../../assets/images/Logo_fox.png";
import { getDayCountForMonth } from "./utils";

const DatePicker = ({
  dateSetAction = () => {},
  closeAction = () => {},
  showPicker,
}) => {
  const [dateState, setDateState] = useState({
    date: new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    hour: 0,
    minute: 0,
  });

  const processDateEntry = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    let dateObj = new Date(e.target.value);
    // allow change only if date is greater than current date

    if (dateObj.getTime() > new Date().getTime()) {
      setDateState({
        ...dateState,
        date: dateObj.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      });
    }
  };

  const handleTimeChange = (e, limit) => {
    let value = e.target.value;
    if (value > limit) {
      value = limit;
    }
    if (value < 0) {
      value = 0;
    }
    setDateState({
      ...dateState,
      [e.target.name]: Number(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dateState);

    //transform dateState object to valid datetime object
    let dateObj = new Date(dateState.date);
    dateObj.setHours(dateState.hour);
    dateObj.setMinutes(dateState.minute);

    dateSetAction(dateObj);
  };

  useState(() => {
    if (!showPicker) {
      setDateState({
        date: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        hour: 0,
        minute: 0,
      });
    }
  }, [showPicker]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`datePicker ${showPicker ? "showPicker" : null}`}
    >
      <div className="datePickerBackground"></div>
      <div className="datePickerContent">
        <p className="popup-close" onClick={() => closeAction()}>
          X
        </p>
        <img src={logo} alt="" />
        <h2>Auction Duration</h2>
        <div className="datePickerInput">
          <div className="selectTime">
            <label htmlFor="time" className="timeEntry">
              <input
                type="text"
                inputmode="numeric"
                name="hour"
                id="hour"
                min={0}
                max="23"
                defaultValue={0}
                value={dateState.hour}
                onChange={(e) => handleTimeChange(e, 23)}
                maxLength={2}
              />
            </label>
            <span>:</span>
            <label htmlFor="time" className="timeEntry">
              <input
                type="text"
                inputmode="numeric"
                name="minute"
                id="minute"
                min="0"
                max="59"
                defaultValue={0}
                value={dateState.minute}
                onChange={(e) => handleTimeChange(e, 59)}
                maxLength={2}
              />
            </label>
          </div>
          <div className="selectDate">
            <label htmlFor="date">
              <p>{dateState.date}</p>
              <input
                type="date"
                min={new Date().toLocaleDateString()}
                name="date"
                id="date"
                onChange={processDateEntry}
              />
            </label>
          </div>
        </div>
        <button type="submit" className="confirmDatePicker">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default DatePicker;
