import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { useAppSelector } from "../../app/hooks";
import { selectActiveDate } from "../../features/dateTime/dateTimeSlice";
import { selectCommit } from "../../features/commits/commitsSlice";
import Event from "../event";

const Dates = (): React.JSX.Element => {
    const activeDate = useAppSelector(selectActiveDate);
    const commits = useAppSelector(selectCommit);

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
                    <span className={`day-num ${!isSameMonth(day, startOfSelectedMonth)? "inactive-day" : ""} ${isSameDay(day, new Date()) ? "today" : ""}`}>{formattedDate}</span>
                    {commits.map((commit) => (
                        (isSameDay(day, new Date(commit.date)) && isSameMonth(day, startOfSelectedMonth)) && <Event key={commit.date} commit={commit} />
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