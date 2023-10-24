import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActiveDate, selectSelectedDate, setActiveDate, setSelectedDate } from "../../features/dateTime/dateTimeSlice";

const Calendar = (): React.JSX.Element => {
    const activeDate = useAppSelector(selectActiveDate);
    const selectedDate = useAppSelector(selectSelectedDate);

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

    const getDates = (): React.JSX.Element => {
        const startOfSelectedMonth = startOfMonth(activeDate);
        const endOfSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfSelectedMonth, { weekStartsOn: 1 });
        const endDate = endOfWeek(endOfSelectedMonth);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div className="day"  key={day.toDateString()} onClick={() => dispatch(setSelectedDate(Date.parse(cloneDay.toDateString())))}>
                        <span className={`day-num ${!isSameMonth(day, startOfSelectedMonth)? "inactive-day" : ""} ${isSameDay(day, new Date()) ? "today" : ""} ${isSameDay(day, selectedDate) ? "selected-day" : ""}`}>{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="weeks" key={day.toDateString()}>
                    {days}
                </div>
            );
            days = [];
        }

        return <>{rows}</>
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
                {getDates()}
            </section>
        </>
    );
}

export default Calendar;