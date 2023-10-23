import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActiveDate, selectSelectedDate, setActiveDate, setSelectedDate } from "../../features/dateTime/dateTimeSlice";

const Calendar = (): React.JSX.Element => {
    const activeDate = useAppSelector(selectActiveDate);
    const selectedDate = useAppSelector(selectSelectedDate);

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

    // One week
    const generateDatesForCurrentWeek = (date: Date, selectedDate: Date, activeDate: Date): React.JSX.Element[] => {
        let currentDate = date;
        const week = [];
        for (let day = 0; day < 7; day++) {
            const cloneDate = currentDate;
            if (isSameMonth(currentDate, activeDate)) {
                week.push(
                    <td key={format(currentDate, "d")} className={`day ${isSameDay(currentDate, selectedDate) ? "selected-day" : ""} ${isSameDay(currentDate, new Date()) ? "today": ""}`}
                    onClick={() => dispatch(setSelectedDate(cloneDate))}>
                        {format(currentDate, "d")}
                    </td>
                );
            }

            currentDate = addDays(currentDate, 1);
            
        }
        return week;
    };

    // All weeks in the month
    const getDates = (): React.JSX.Element => {
        const startOfSelectedMonth = startOfMonth(activeDate);
        const endOfSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfSelectedMonth);
        const endDate = endOfWeek(endOfSelectedMonth);

        let currentDate = startDate;

        const allWeeks: React.JSX.Element[] = [];

        while (currentDate <= endDate) {
            generateDatesForCurrentWeek(currentDate, selectedDate, activeDate).map((week) => {
                allWeeks.push(week);
            })

            currentDate = addDays(currentDate, 7);
        }

        return <tr className="weeks">{allWeeks}</tr>;
    };

    return (
        <>
            <div className="header">
                <button className="switch-month" onClick={() => dispatch(setActiveDate(subMonths(activeDate, 1)))}>
                    Previous
                </button>
                <h1 className="current-month">{format(activeDate, "MMMM yyyy")}</h1>
                <button className="switch-month" onClick={() => dispatch(setActiveDate(addMonths(activeDate, 1)))}>
                    Next
                </button>
            </div>
            <table className="calendar-table">
                <thead>
                    <tr>
                        {getWeekDays().map((weekday) => (
                            <th key={weekday} className="weekday">{weekday}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getDates()}
                </tbody>
            </table>
        </>
    );
}

export default Calendar;