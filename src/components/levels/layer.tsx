import { useState } from "react";
import { RefreshContext, useGameState } from "../../hooks";
import { LayerData, SecretLevelData } from "../../types";
import Divider from "../divider";
import Flex from "../flex";
import Level from "./level";
import Skull from "./skull";

function SecretLevel({ secret }: { secret?: SecretLevelData }) {
    if (!secret) return null;

    // At some point it'd be smart to deduplicate the toggle code

    const [state, refresh] = useGameState();

    const accessible = secret.possible(state);

    const fillColor = secret.current
        ? accessible
            ? "white"
            : "grey"
        : "black";

    const borderColor = accessible ? "white" : "grey";

    const textColor = secret.current ? "black" : "white";

    // This sucks, but it works
    const skulls = (
        <div
            style={{
                display: "inline-block",
                position: "absolute",
                left: 10 + -75 * secret.skulls.length,
                top: -10,
            }}
        >
            {secret.skulls.map((_, index) => (
                <Skull
                    level={secret}
                    refresh={refresh}
                    index={index}
                    key={index}
                />
            ))}
        </div>
    );

    return (
        <div style={{ float: "right", position: "relative" }}>
            {state.settings.randomize_skulls && skulls}

            <div
                style={{
                    border: `5px solid ${borderColor}`,
                    backgroundColor: fillColor,
                    borderRadius: "5px",
                    padding: "8px 64px 8px 64px",
                }}
                onClick={() => {
                    if (!secret.possible(state)) return;
                    refresh();
                    secret.current = !secret.current;
                }}
            >
                <text style={{ color: textColor, fontSize: 20 }}>
                    SECRET MISSION
                </text>
            </div>
        </div>
    );
}

function LayerBar({ layer }: { layer: LayerData }) {
    return (
        <div
            style={{
                margin: 10,
                padding: 10,
                whiteSpace: "nowrap",
            }}
        >
            <text style={{ fontSize: 38, padding: 0, display: "inline-block" }}>
                {layer.name}
            </text>
            <SecretLevel secret={layer.secret} />
        </div>
    );
}

export default function Layer({ layer }: { layer: LayerData }) {
    // Refreshing hack
    const [, setState] = useState(0);

    return (
        <div id="layer" style={{ padding: 20 }}>
            <RefreshContext.Provider value={() => setState((x) => x + 1)}>
                <Flex direction="column">
                    <LayerBar layer={layer} />
                    <Divider />
                    <Flex id="levels" direction="row">
                        {layer.levels.map((level) => (
                            <Level level={level} key={level.name}></Level>
                        ))}
                    </Flex>
                </Flex>
            </RefreshContext.Provider>
        </div>
    );
}
