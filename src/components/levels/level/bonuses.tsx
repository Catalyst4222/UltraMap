import { useGameState } from "../../../hooks";
import { BonusData, BonusType, LevelData, State } from "../../../types";
import Checkbox from "../../checkbox";
import Flex from "../../flex";

function isBonusActive(bonus: BonusData, state: State) {
    if (bonus.type == BonusType.WEAPON) return true;

    if (bonus.type == BonusType.BOSS_STANDARD)
        return state.settings.boss_rewards != "disabled";

    if (bonus.type == BonusType.BOSS_EXTENDED)
        return state.settings.boss_rewards == "extended";

    if (bonus.type == BonusType.SWITCH_LIMBO)
        return state.settings.randomize_limbo_switches;

    if (bonus.type == BonusType.SWITCH_VIOLENCE)
        return state.settings.randomize_violence_switches;

    if (bonus.type == BonusType.HANK) return state.settings.hank_rewards;

    // Unknown type
    console.error(`Unknown bonus type ${bonus.type} for bonus ${bonus.name}`);
    return true;
}

function Bonus({
    bonus,
    levelUnlocked,
}: {
    bonus: BonusData;
    levelUnlocked: boolean;
}) {
    const [state, refresh] = useGameState();

    // Only show the bonuses that the player needs
    if (!isBonusActive(bonus, state)) {
        return null;
    }

    const accessible = levelUnlocked && bonus.possible(state);

    const fillColor = bonus.current ? (accessible ? "white" : "grey") : "black";

    const borderColor = accessible ? "white" : "grey";

    return (
        <Checkbox
            text={bonus.name}
            fillColor={fillColor}
            borderColor={borderColor}
            onClick={() => {
                if (!levelUnlocked) return;
                bonus.current = !bonus.current;
                refresh();
            }}
        />
    );
}

export default function Bonuses({ level }: { level: LevelData }) {
    return (
        <Flex direction="column" id="bonuses" style={{}}>
            {level.bonuses.map((bonus, index) => (
                <Bonus
                    bonus={bonus}
                    levelUnlocked={level.unlocked}
                    key={index}
                ></Bonus>
            ))}
        </Flex>
    );
}
