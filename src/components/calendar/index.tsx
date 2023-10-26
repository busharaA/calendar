import { useState, useEffect } from "react";
import { addMonths, format, subMonths } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActiveDate, setActiveDate } from "../../features/dateTime/dateTimeSlice";
import Dates from "../dates";

const Calendar = (): React.JSX.Element => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 992;

    const activeDate = useAppSelector(selectActiveDate);
    const activeDateNumToDate = new Date(activeDate);

    const dispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
        return () => window.removeEventListener("resize", () => setWidth(window.innerWidth));
    }, [])    

    const weekdays = ["Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <>
            <div className="header">
                <button className="header__switch-month" onClick={() => dispatch(setActiveDate(Date.parse(subMonths(activeDateNumToDate, 1).toDateString())))}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="header__current-month">{format(activeDate, "MMMM yyyy")}</h1>
                <button className="header__switch-month" onClick={() => dispatch(setActiveDate(Date.parse(addMonths(activeDateNumToDate, 1).toDateString())))}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
            <section className="calendar-table">
                <div className="weekdays">
                    {width >= breakpoint && weekdays.map((weekday) => (
                        <div key={weekday} className="weekday">{weekday}</div>
                    ))}
                    {width < breakpoint && weekdaysShort.map((weekday) => (
                        <div key={weekday} className="weekday">{weekday}</div>
                    ))}
                </div>
                <Dates />
            </section>
            <div className="bottom-space"></div>
        </>
    );
}

export default Calendar;