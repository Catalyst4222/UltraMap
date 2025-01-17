import { ActData } from "../../types";
import Layer from "./layer";

export default function Act({ act }: { act: ActData }) {
    return (
        <div id="act">
            {act.map((layer, index) => (
                <Layer layer={layer} key={index} />
            ))}
        </div>
    );
}
