import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { IEvent } from "../../helpers/interfaces/IEvent";
import { useAppDispatch } from "../../app/hooks";
import { setHolidayDetails } from "../../features/commits/holidaysSlice";

const Event = ({ holiday }: IEvent ): React.JSX.Element => {
    const dispatch = useAppDispatch();

    return (
        <button className="event" onClick={() => dispatch(setHolidayDetails(holiday))}>
            <p>
                {holiday.name}
            </p>
            <p>{format(new Date(holiday.date), "p", { locale: hr })}</p>
        </button>
    )
}

export default Event;
