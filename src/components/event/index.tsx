import { format } from "date-fns";
import { IEvent } from "../../helpers/interfaces/IEvent";
import { hr } from "date-fns/locale";

const Event = ({ date, message }: IEvent): React.JSX.Element => {

    return (
        <div className="event">
            <p>
                <b>{message}</b>
            </p>
            <p>{format(new Date(date), "p", { locale: hr })}</p>
        </div>
    )
}

export default Event;
