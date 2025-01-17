import { useGameState } from "../../hooks";
import SettingsCheckbox from "../settingsCheckbox";
import TextSelect from "../textSelect";

export default function GameSettings() {
    const [state] = useGameState();

    return (
        <>
            <text style={{ fontSize: 28 }}>Randomizer Settings</text>

            <TextSelect
                text="Boss Rewards"
                defaultValue={state.settings.boss_rewards || "disabled"}
                options={
                    [
                        { label: "Disabled", value: "disabled" },
                        { label: "Standard", value: "standard" },
                        { label: "Extended", value: "extended" },
                    ] as const
                }
                onChange={(newValue) => {
                    if (!newValue) {
                        console.error("Unexpected missing value!");
                        return;
                    }

                    state.settings.boss_rewards = newValue.value;
                }}
            />

            <SettingsCheckbox
                text="Hank Rewards"
                setting={state.settings}
                target="hank_rewards"
            />

            <SettingsCheckbox
                text="Randomize Secondary Fire"
                setting={state.settings}
                target="randomize_secondary_fire"
            />

            <SettingsCheckbox
                text="Randomize Skulls"
                setting={state.settings}
                target="randomize_skulls"
            />

            <SettingsCheckbox
                text="Randomize Limbo Switches"
                setting={state.settings}
                target="randomize_limbo_switches"
            />

            <SettingsCheckbox
                text="Randomize Violence Switches"
                setting={state.settings}
                target="randomize_violence_switches"
            />

            {/** To start, we just need boss rewards, hank rewards, randomize secondary, skulls, switches x2 */}
        </>
    );
}
