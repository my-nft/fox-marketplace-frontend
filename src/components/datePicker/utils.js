
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
    console.log(monthNum)
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