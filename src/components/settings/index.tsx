import Divider from "../divider";
import Flex from "../flex";
import ArchipelagoSettings from "./archipelago_settings";
import GameSettings from "./game_settings";

export default function Settings() {
    return (
        <Flex
            direction="column"
            style={{ width: "33%", margin: "auto", padding: 15 }}
        >
            <GameSettings />
            <Divider />
            <ArchipelagoSettings />
        </Flex>
    );
}

/*
Settings (Do title of section + divider of ~1/3rd width (Sections of
        Archipelago (for connections, also checkbox for auto-update), Initial
        settings (dashes, alternate forms), and logic settings (skulls,
        secondaries))) \n\n\n also do checks in the movement box in arsenal for
        if it's actually randomized
        */
