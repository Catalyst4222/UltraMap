import { ActData } from "../../types";
import Act from "./act";

export default function Levels({ acts }: { acts: ActData[] }) {
    return (
        <div id="levels">
            {acts.map((act, index) => (
                <Act act={act} key={index} />
            ))}
        </div>
    );
}
