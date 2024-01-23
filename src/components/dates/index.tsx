import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { useAppSelector } from "../../app/hooks";
import { selectActiveDate } from "../../features/dateTime/dateTimeSlice";
import Event from "../event";
import { selectHoliday } from "../../features/commits/holidaysSlice";

const Dates = (): React.JSX.Element => {
    const activeDate = useAppSelector(selectActiveDate);
    const holidays = useAppSelector(selectHoliday);

    const startOfSelectedMonth = startOfMonth(activeDate);
    const endOfSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfSelectedMonth, { weekStartsOn: 1 });
    const endDate = endOfWeek(endOfSelectedMonth);

    const weeks = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "d");
            days.push(
                <div className="day" key={day.toDateString()}>
                    <span className={`day__number ${!isSameMonth(day, startOfSelectedMonth)? "day_display_inactive" : ""} ${isSameDay(day, new Date()) ? "day_display_today" : ""}`}>{formattedDate}</span>
                    {holidays.map((holiday) => (
                        (isSameDay(day, new Date(holiday.date)) && isSameMonth(day, startOfSelectedMonth)) && <Event key={holiday.date} holiday={holiday} />
                    ))}
                </div>
            );
            day = addDays(day, 1);
        }
        weeks.push(
            <div className="weeks" key={day.toDateString()}>
                {days}
            </div>
        );
        days = [];
    }

    return <>{weeks}</>
};

export default Dates;