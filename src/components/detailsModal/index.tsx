import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearCommitDetails, selectCommitDetails } from "../../features/commits/commitsSlice";
import { hr } from "date-fns/locale";

const DetailsModal = (): React.JSX.Element => {
    const commitDetails = useAppSelector(selectCommitDetails);

    const dispatch = useAppDispatch();

    return (
        <div className="modal-background" onClick={() => dispatch(clearCommitDetails())}>
            <div className="details-modal" onClick={(e) => e.stopPropagation()}>
                <div className="details-modal__header">
                    <p>Commit message</p>
                    <button className="details-modal__close" onClick={() =>dispatch(clearCommitDetails())}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <h2>{commitDetails.message}</h2>
                <div className="details-modal__line"></div>
                <div className="details-modal__info">
                    <p><span>Author: </span>{commitDetails.name}</p>
                    <p><span>Date: </span>{format(new Date(commitDetails.date), "Pp", { locale: hr })}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;