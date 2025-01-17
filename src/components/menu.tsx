import { useState } from "react";
import { State } from "../types";
import Levels from "./levels";
import Flex from "./flex";
import Settings from "./settings";
import Arsenal from "./arsenal";

function MenuIcon({
    name,
    state,
    refresh,
}: {
    name: string;
    state: State;
    refresh: () => void;
}) {
    return (
        <Flex
            style={{
                height: "100%",
                width: 250,
                textAlign: "center",
                alignItems: "center",
                borderWidth: "0px 2px 0px 2px",
                borderColor: "white",
                borderStyle: "solid",
                // margin: "0 10px 0 10px",
            }}
            onClick={() => {
                state.page = name.toLowerCase() as State["page"];
                refresh();
            }}
        >
            <text style={{ margin: "auto" }}>{name}</text>
        </Flex>
    );
}

function MenuBar({ state, refresh }: { state: State; refresh: () => void }) {
    return (
        <div
            id="navbar"
            style={{
                position: "sticky",
                top: 0,
                width: "100vw",
                height: "50px",
                borderBottom: "5px solid white",
                backgroundColor: "black",
                zIndex: 1,
            }}
        >
            <Flex style={{ height: "100%" }}>
                <MenuIcon state={state} refresh={refresh} name="Levels" />
                <MenuIcon state={state} refresh={refresh} name="Arsenal" />
                <MenuIcon state={state} refresh={refresh} name="Settings" />
            </Flex>
        </div>
    );
}

export default function Menu({ state }: { state: State }) {
    // Reload function to switch the body
    const [, _setState] = useState(0);
    const refresh = () => _setState((x) => x + 1);

    let body;
    switch (state.page) {
        case "levels":
            body = <Levels acts={state.acts} />;
            break;
        case "arsenal":
            body = <Arsenal arsenal={state.arsenal} />;
            break;
        case "settings":
            body = <Settings />;
    }

    return (
        <div>
            <MenuBar state={state} refresh={refresh} />
            {body}
        </div>
    );
}
