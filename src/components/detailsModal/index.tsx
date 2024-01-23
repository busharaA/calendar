import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearHolidayDetails, selectHolidayDetails } from "../../features/commits/holidaysSlice";
import { hr } from "date-fns/locale";

const DetailsModal = (): React.JSX.Element => {
    const holidayDetails = useAppSelector(selectHolidayDetails);

    const dispatch = useAppDispatch();

    return (
        <div className="modal-background" onClick={() => dispatch(clearHolidayDetails())}>
            <div className="details-modal" onClick={(e) => e.stopPropagation()}>
                <div className="details-modal__header">
                    <p>Commit message</p>
                    <button className="details-modal__close" onClick={() =>dispatch(clearHolidayDetails())}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <h2>{holidayDetails.name}</h2>
                <div className="details-modal__line"></div>
                <div className="details-modal__info">
                    <p><span>Date: </span>{format(new Date(holidayDetails.date), "Pp", { locale: hr })}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;