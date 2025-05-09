import { useState } from "react";
import logo from "../../assets/images/Logo_fox.png";
import { getDayCountForMonth } from "./utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const today = new Date();

const CustomDatePicker = ({
  dateSetAction = () => {},
  closeAction = () => {},
  showPicker,
}) => {
  const [dateState, setDateState] = useState({
    date: today.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    hour: 0,
    minute: 0,
  });

  const processDateEntry = (e) => {
    if (e.getTime() >= today.getTime()) {
      setDateState({
        ...dateState,
        date: e.getTime(),
      });
    }
  };

  const handleTimeChange = (e, limit) => {
    let value = e.target.value;
    if (isNaN(value)) {
      value = 0;
    }
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

    //transform dateState object to valid datetime object
    let dateObj = new Date(dateState.date);
    dateObj.setHours(dateState.hour);
    dateObj.setMinutes(dateState.minute);

    dateSetAction(dateObj);
  };

  const toDoubleDigits = (num) => {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  };

  useState(() => {
    if (!showPicker) {
      setDateState({
        date: today.toLocaleDateString("en-US", {
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
        <div className="datePickerTexture"></div>
        <div className="datePickerItems">
          <img src={logo} alt="" />
          <h2>Auction Duration</h2>
          <div className="datePickerInput">
            <div className="selectTime">
              <label htmlFor="time" className="timeEntry">
                <input
                  type="text"
                  inputMode="numeric"
                  name="hour"
                  id="hour"
                  min={0}
                  max="23"
                  defaultValue={0}
                  value={dateState.hour}
                  onChange={(e) => handleTimeChange(e, 23)}
                  maxLength={2}
                />
                <p>{toDoubleDigits(dateState.hour)}</p>
              </label>
              <span>:</span>
              <label htmlFor="time" className="timeEntry">
                <input
                  type="text"
                  inputMode="numeric"
                  name="minute"
                  id="minute"
                  min="0"
                  max="59"
                  defaultValue={""}
                  onChange={(e) => handleTimeChange(e, 59)}
                  maxLength={2}
                />
                <p>{toDoubleDigits(dateState.minute)}</p>
              </label>
            </div>
            <div className="selectDate">
              <label htmlFor="date">
                <DatePicker
                  id="date"
                  minDate={today}
                  value={new Date(dateState.date)}
                  selected={new Date(dateState.date)}
                  onChange={processDateEntry}
                  name="date"
                  customInput={
                    <p>
                      {new Date(dateState.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  }
                />
              </label>
            </div>
          </div>
          <button type="submit" className="confirmDatePicker">
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
};

export default CustomDatePicker;
