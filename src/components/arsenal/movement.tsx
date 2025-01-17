import { useState } from "react";
import type { Movement } from "../../types";
import Card from "../card";
import Divider from "../divider";
import Flex from "../flex";
import MultiCheckbox from "../multiCheckbox";
import Checkbox from "../checkbox";
import { useRefresh } from "../../hooks";

function Dashes({ movement }: { movement: Movement }) {
    // Map number to list of bools
    const [dashes, setDashes] = useState<boolean[]>(
        Array(movement.dashes)
            .fill(true)
            .concat(Array(3 - movement.dashes).fill(false))
    );

    // Toggle specific box and change total value
    const onClicks = dashes.map((_, index) => () => {
        dashes[index] = !dashes[index];
        if (dashes[index]) {
            movement.dashes = index + 1;
        } else {
            movement.dashes = index;
        }
        setDashes(
            Array(movement.dashes)
                .fill(true)
                .concat(Array(3 - movement.dashes).fill(false))
        );
    });

    const fillColors = dashes.map((dash) => (dash ? "white" : "black"));

    return (
        <div style={{ paddingLeft: 15 }}>
            <MultiCheckbox
                text="Dashes"
                onClicks={onClicks}
                fillColors={fillColors}
            />
        </div>
    );
}

function Walljumps({ movement }: { movement: Movement }) {
    // Map number to list of bools
    const [walljumps, setWalljumps] = useState<boolean[]>(
        Array(movement.walljumps)
            .fill(true)
            .concat(Array(3 - movement.walljumps).fill(false))
    );

    // Toggle specific box and change total value
    const onClicks = walljumps.map((_, index) => () => {
        walljumps[index] = !walljumps[index];
        if (walljumps[index]) {
            movement.walljumps = index + 1;
        } else {
            movement.walljumps = index;
        }
        setWalljumps(
            Array(movement.walljumps)
                .fill(true)
                .concat(Array(3 - movement.walljumps).fill(false))
        );
    });

    const fillColors = walljumps.map((walljump) =>
        walljump ? "white" : "black"
    );

    return (
        <div style={{ paddingLeft: 15 }}>
            <MultiCheckbox
                text="Walljumps"
                onClicks={onClicks}
                fillColors={fillColors}
            />
        </div>
    );
}

export default function Movement({ movement }: { movement: Movement }) {
    const refresh = useRefresh();

    return (
        <Card id="movement">
            <Flex style={{ justifyContent: "center" }}>
                <text
                    style={{
                        fontSize: 28,
                        textAlign: "center",
                    }}
                >
                    Movement
                </text>
            </Flex>
            <Divider />

            <div style={{ padding: 15 }}>
                <Dashes movement={movement} />
                <Walljumps movement={movement} />

                <Checkbox
                    text="Slide"
                    fillColor={movement.slide ? "white" : "black"}
                    onClick={() => {
                        movement.slide = !movement.slide;
                        refresh();
                    }}
                />

                <Checkbox
                    text="Slam"
                    fillColor={movement.slam ? "white" : "black"}
                    onClick={() => {
                        movement.slam = !movement.slam;
                        refresh();
                    }}
                />
            </div>
        </Card>
    );
}
