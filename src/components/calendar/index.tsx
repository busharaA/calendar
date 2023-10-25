import { addDays, addMonths, format, startOfWeek, subMonths } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActiveDate, setActiveDate } from "../../features/dateTime/dateTimeSlice";
import Dates from "../dates";

const Calendar = (): React.JSX.Element => {
    const activeDate = useAppSelector(selectActiveDate);

    const activeDateNumToDate = new Date(activeDate);

    const dispatch = useAppDispatch();

    const getWeekDays = (): string[] => {
        const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });
        const weekdays: string[] = [];
        for (let day = 0; day < 7; day++) {
            weekdays.push(
                format(addDays(weekStartDate, day), "iiii")
            );
        }
        return weekdays;
    };

    return (
        <>
            <div className="header">
                <button className="switch-month" onClick={() => dispatch(setActiveDate(Date.parse(subMonths(activeDateNumToDate, 1).toDateString())))}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="current-month">{format(activeDate, "MMMM yyyy")}</h1>
                <button className="switch-month" onClick={() => dispatch(setActiveDate(Date.parse(addMonths(activeDateNumToDate, 1).toDateString())))}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
            <section className="calendar-table">
                <div className="weekdays">
                    {getWeekDays().map((weekday) => (
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