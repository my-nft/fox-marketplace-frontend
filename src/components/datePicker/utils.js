
const MONTHS_MAP = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
]


export const getDaysForMonth = (month, year) => {
    let monthNum = MONTHS_MAP.indexOf(month);
    const days = [];
    const date = new Date(year, monthNum, 1);
    while (date.getMonth() === monthNum) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export const getDayCountForMonth = (month, year) => {
    return getDaysForMonth(month, year).length;
}

export const dateToUserFriendlyValue = (date) => {
    const difference = new Date().getTime() - new Date(date).getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
  };