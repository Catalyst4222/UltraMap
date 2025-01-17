import { LevelData } from "../../../types";
import Skull from "../skull";
import { useGameState } from "../../../hooks";

export default function LevelIcon({
    level,
    refresh,
}: {
    level: LevelData;
    refresh: () => void;
}) {
    const [state] = useGameState();

    // preloading images feat: bryan's advice
    const lockedImage = (
        <img
            src="/images/Locked3.png"
            style={{
                width: "100%",
                maxWidth: 320,
                margin: "auto",
                objectFit: "contain",
                display: level.unlocked ? "none" : "block",
            }}
            onClick={() => {
                level.unlocked = !level.unlocked;
                refresh();
            }}
        />
    );
    const unlockedImage = (
        <img
            src={`/images/${level.name.replace(/[.:,]/g, "")}.png`}
            style={{
                width: "100%",
                maxWidth: 320,
                margin: "auto",
                display: level.unlocked ? "block" : "none",
                objectFit: "contain",
            }}
            onClick={() => {
                level.unlocked = !level.unlocked;
                refresh();
            }}
        />
    );

    const skulls = (
        <div
            style={{
                position: "absolute", // Anchor position for the skulls
                bottom: 10,
                right: 15, // TODO: check this
            }}
        >
            {level.skulls.map((_, index) => (
                <Skull
                    level={level}
                    refresh={refresh}
                    index={index}
                    key={index}
                    {
                        /** don't do key={index} normally, but here it's less bad because their indicies don't change */ ...{}
                    }
                />
            ))}
        </div>
    );

    return (
        <div style={{ position: "relative", padding: 5 }}>
            {lockedImage}
            {unlockedImage}

            {state.settings.randomize_skulls && skulls}
        </div>
    );
}
