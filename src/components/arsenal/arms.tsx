import { useRefresh } from "../../hooks";
import { ArmLayout, Arsenal } from "../../types";
import Card from "../card";
import Checkbox from "../checkbox";
import Divider from "../divider";
import Flex from "../flex";

function Arm({ arsenal, layout }: { arsenal: Arsenal; layout: ArmLayout }) {
    const refresh = useRefresh();

    return (
        <Checkbox
            text={layout.name}
            fillColor={arsenal.arms[layout.target] ? "white" : "black"}
            onClick={() => {
                arsenal.arms[layout.target] = !arsenal.arms[layout.target];
                refresh();
            }}
        />
    );
}

export default function Arms({
    arsenal,
    layouts,
}: {
    arsenal: Arsenal;
    layouts: ArmLayout[];
}) {
    return (
        <Card id="arms">
            <Flex style={{ justifyContent: "center" }}>
                <text
                    style={{
                        fontSize: 28,
                        textAlign: "center",
                    }}
                >
                    Arms
                </text>
            </Flex>
            <Divider />

            {layouts.map((layout, index) => (
                <Arm arsenal={arsenal} layout={layout} key={index} />
            ))}
        </Card>
    );
}
