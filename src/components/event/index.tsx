import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { IEvent } from "../../helpers/interfaces/IEvent";
import { useAppDispatch } from "../../app/hooks";
import { setCommitDetails } from "../../features/commits/commitsSlice";

const Event = ({ commit }: IEvent ): React.JSX.Element => {
    const dispatch = useAppDispatch();

    return (
        <button className="event" onClick={() => dispatch(setCommitDetails(commit))}>
            <p>
                {commit.message}
            </p>
            <p>{format(new Date(commit.date), "p", { locale: hr })}</p>
        </button>
    )
}

export default Event;
