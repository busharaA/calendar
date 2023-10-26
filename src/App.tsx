import { useEffect } from "react";
import Calendar from "./components/calendar";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchCommits, selectCommitDetails } from "./features/commits/commitsSlice";
import DetailsModal from "./components/detailsModal";

const App = () => {
    const commitDetails = useAppSelector(selectCommitDetails);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCommits());
    }, [])

    return (
        <div className="App">
            <Calendar />
            {Object.values(commitDetails).every((value) => value !== "") && <DetailsModal />}
        </div>
    );
}

export default App;
