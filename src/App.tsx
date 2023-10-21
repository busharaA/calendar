import Calendar from "./components/calendar";

const App = () => {
    return (
        <div className="App">
            <div className="header">
                <button className="switch-month">Previous</button>
                <h1>January 2022</h1>
                <button className="switch-month">Next</button>
            </div>
            <Calendar />
        </div>
    );
}

export default App;
