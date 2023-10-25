import { useEffect } from "react";
import Calendar from "./components/calendar";
import { useAppDispatch } from "./app/hooks";
import { fetchCommits } from "./features/commits/commitsSlice";

const App = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCommits());
    }, [])

    return (
        <div className="App">
            <Calendar />
        </div>
    );
}

export default App;
