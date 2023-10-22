import { eachDayOfInterval, format } from "date-fns";
import Days from "../days";
import { enUS } from "date-fns/locale";
import { useAppSelector } from "../../app/hooks";
import { selectActiveDate } from "../../features/dateTime/dateTimeSlice";

const Calendar = (): React.JSX.Element => {
    const activeDate = useAppSelector(selectActiveDate);

    // const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const daysOfWeek = eachDayOfInterval({ start: new Date(), end: new Date().setDate( new Date().getDate() + 6) });
    const weekdays = daysOfWeek.map((day) => format(day, "iiii", { locale: enUS, weekStartsOn: 1 }));
    console.log(weekdays);

    return (
        <>
            <div className="header">
                <button className="switch-month">
                    Previous
                </button>
                <h1 className="current-month">{format(activeDate, "MMMM yyyy")}</h1>
                <button className="switch-month">
                    Next
                </button>
            </div>
            <table className="calendar-table">
                <thead>
                    <tr>
                        {weekdays.map((weekday) => (
                            <th key={weekday} className="weekday">{weekday}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* map through the days of the month and show this component */}
                    <Days />
                </tbody>
            </table>
        </>
    );
}

export default Calendar;