import Days from "../days";

const Calendar = (): React.JSX.Element => {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
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
    );
}

export default Calendar;