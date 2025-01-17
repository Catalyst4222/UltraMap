import {
    BonusType,
    LayerData,
    LevelData,
    RankType,
    SecretLevelData,
    SkullType,
} from "../../types";
import {
    always_perfectable,
    always_perfectable_if,
    always_possible,
    can_break_idol,
    can_break_walls,
    can_grab,
    can_slam_storage,
    can_slide,
    has_all_skulls,
    has_dashes,
    has_electricity,
    has_general_jump,
    has_walljumps,
} from "../logic";

const seven_one: LevelData = {
    name: "7-1: GARDEN OF FORKING PATHS",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return can_grab(state) && has_all_skulls(seven_one, state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_general_jump(state, 2) &&
                has_all_skulls(seven_one, state)
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [
        { current: false, possible: (state) => has_general_jump(state, 2) },
        {
            current: false,
            possible: (state) => has_general_jump(state) && can_slide(state),
        },
        {
            current: false,
            possible: (state) =>
                has_general_jump(state) && has_all_skulls(seven_one, state),
        },
        {
            current: false,
            possible: (state) =>
                has_general_jump(state, 2) && has_all_skulls(seven_one, state),
        },
        {
            current: false,
            possible: (state) =>
                has_general_jump(state, 2) && has_all_skulls(seven_one, state),
        },
    ],

    bonuses: [],
};

const seven_two: LevelData = {
    name: "7-2: LIGHT UP THE NIGHT",

    unlocked: false,
    skulls: [SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return (
                state.arsenal.arms.whiplash &&
                can_break_walls(state) &&
                has_all_skulls(seven_two, state)
            );
        },
    },

    rank: always_perfectable_if(
        (state) =>
            state.arsenal.arms.whiplash && has_all_skulls(seven_two, state)
    ),

    secrets: [
        {
            current: false,
            possible: (state) =>
                state.arsenal.arms.whiplash &&
                (has_walljumps(state) || has_dashes(state)),
        },
        { current: false, possible: (state) => state.arsenal.arms.whiplash },
        { current: false, possible: (state) => state.arsenal.arms.whiplash },
        { current: false, possible: (state) => state.arsenal.arms.whiplash },
        { current: false, possible: (state) => state.arsenal.arms.whiplash },
    ],

    bonuses: [
        {
            name: "Impact Hammer",
            type: BonusType.WEAPON,
            current: false,
            possible(state) {
                if (state.settings.randomize_violence_switches) {
                    // TODO: Check when all switches have been gotten
                    return false;
                } else {
                    return seven_two.bonuses
                        .filter(
                            (bonus) => bonus.type == BonusType.SWITCH_VIOLENCE
                        )
                        .every((bonus) => bonus.possible(state));
                }
            },
        },
        {
            name: "Violence Switch I",
            type: BonusType.SWITCH_VIOLENCE,
            current: false,
            possible(state) {
                return state.arsenal.arms.whiplash && has_dashes(state);
            },
        },
        {
            name: "Violence Switch II",
            type: BonusType.SWITCH_VIOLENCE,
            current: false,
            possible(state) {
                return state.arsenal.arms.whiplash && has_dashes(state);
            },
        },
        {
            name: "Violence Switch III",
            type: BonusType.SWITCH_VIOLENCE,
            current: false,
            possible(state) {
                return (
                    state.arsenal.arms.whiplash &&
                    has_dashes(state) &&
                    has_all_skulls(seven_two, state)
                );
            },
        },
    ],
};

// The single simplest level in the randomizer
const seven_three: LevelData = {
    name: "7-3: NO SOUND, NO MEMORY",

    unlocked: false,
    skulls: [],

    challenge: always_possible(), // Secret exit cheese my beloved

    rank: always_perfectable(),

    secrets: [
        always_possible(),
        always_possible(),
        always_possible(),
        always_possible(),
        { current: false, possible: can_slide },
    ],

    bonuses: [],
};

const seven_four: LevelData = {
    name: "7-4: ...LIKE ANTENNAS TO HEAVEN",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible(state) {
            return (
                seven_four.rank.possible(state) != RankType.NONE &&
                has_electricity(state)
            );
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            if (!can_break_idol(state) || !can_slide(state)) {
                return RankType.NONE;
            }

            if (state.arsenal.arms.whiplash) return RankType.PERFECT;
            if (can_slam_storage(state)) return RankType.PASS;

            return RankType.NONE;
        },
    },

    secrets: [],

    bonuses: [
        {
            name: "Defeat 1000-THR \"Earthmover\"",
            type: BonusType.BOSS_STANDARD,
            current: false,
            possible(state) {
                return seven_four.rank.possible(state) != RankType.NONE;
            },
        },
    ],
};

const seven_s: SecretLevelData = {
    name: "7-S: HELL BATH NO FURY",
    possible(state) {
        return (
            seven_three.unlocked &&
            has_all_skulls(seven_s as unknown as LevelData, state)
        );
    },
    current: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],
};

export default {
    name: "VIOLENCE",
    levels: [seven_one, seven_two, seven_three, seven_four],
    secret: seven_s,
} satisfies LayerData as LayerData;
