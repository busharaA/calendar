import { useEffect } from "react";
import Calendar from "./components/calendar";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchHolidays, selectHolidayDetails,  } from "./features/commits/holidaysSlice";
import DetailsModal from "./components/detailsModal";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { selectActiveDate, selectActiveDateUrl, setActiveDateUrl } from "./features/dateTime/dateTimeSlice";
import { format } from "date-fns";

const App = () => {
    const holidayDetails = useAppSelector(selectHolidayDetails);
    const activeDate = useAppSelector(selectActiveDate);
    const activeDateUrl = useAppSelector(selectActiveDateUrl);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchHolidays());
        dispatch(setActiveDateUrl(`/${format(activeDate, "y")}-${format(activeDate, "MM")}`));
    }, []);

    useEffect(() => {
        navigate(activeDateUrl);
    }, [activeDateUrl]);

    return (
        <div className="App">
            <Routes>
                <Route index element={<Navigate to={activeDateUrl} replace />}/>
                <Route path="/*" element={<Calendar />} />
            </Routes>
            {Object.values(holidayDetails).every((value) => value !== "") && <DetailsModal />}
        </div>
    );
}

export default App;
