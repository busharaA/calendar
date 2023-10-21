import Event from "../event";

const Days = (): React.JSX.Element => {
    return (
        <tr> {/* maybe <tr> should be in Calendar */}
            <td className="day">
                {}
                <Event /> {/* if event is in the same day as in the current state of this component, show this component */}
            </td>
        </tr>
    );
}

export default Days;