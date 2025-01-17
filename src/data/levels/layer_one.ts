import {
    SecretLevelData,
    BonusType,
    LayerData,
    LevelData,
    RankType,
    SkullType,
} from "../../types";
import {
    always_possible,
    can_break_glass,
    can_break_rodent_wall,
    can_slide,
    has_all_skulls,
    has_blue_skull,
    has_coins,
    has_electricity,
    has_good_weapon,
    has_red_skull,
} from "../logic";
import { jump_1_1 } from "./extra_logic";

const one_one: LevelData = {
    name: "1-1: HEART OF THE SUNRISE",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return has_coins(state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_all_skulls(one_one, state)
                ? RankType.PERFECT
                : has_coins(state)
                    ? RankType.PASS
                    : RankType.NONE;
        },
    },

    secrets: [
        always_possible(),
        always_possible(),
        { current: false, possible: (state) => has_red_skull(one_one, state) },
        { current: false, possible: (state) => has_red_skull(one_one, state) },
        { current: false, possible: (state) => has_all_skulls(one_one, state) },
    ],

    bonuses: [
        {
            name: "Limbo Switch I",
            type: BonusType.SWITCH_LIMBO,
            current: false,
            possible(state) {
                return (
                    jump_1_1(state) &&
                    has_all_skulls(one_one, state) &&
                    can_break_glass(state)
                );
            },
        },
        {
            name: "Nailgun",
            type: BonusType.WEAPON,
            current: false,
            possible(state) {
                return has_red_skull(one_one, state);
            },
        },
    ],
};

const one_two: LevelData = {
    name: "1-2: THE BURNING WORLD",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return has_electricity(state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            // "Standard" way
            if (has_all_skulls(one_two, state)) {
                return RankType.PERFECT;
            }

            // Challenge path
            if (has_electricity(state)) {
                //     if (has_blue_skull(one_two, state)) {
                //         // TODO Test this!
                //         return RankType.PERFECT;
                //     }
                return RankType.PASS;
            }

            return RankType.NONE;
        },
    },

    secrets: [
        always_possible(),
        always_possible(),
        { current: false, possible: (state) => has_blue_skull(one_two, state) },
        {
            current: false,
            possible: (state) =>
                has_electricity(state) || has_all_skulls(one_two, state),
        },
        {
            current: false,
            possible: (state) =>
                has_electricity(state) || has_all_skulls(one_two, state),
        },
    ],

    bonuses: [
        {
            name: "Limbo Switch II",
            type: BonusType.SWITCH_LIMBO,
            current: false,
            possible(state) {
                return (
                    (has_all_skulls(one_two, state) ||
                        has_electricity(state)) &&
                    can_break_rodent_wall(state)
                );
            },
        },
        {
            name: "Very Cancerous Rodent",
            type: BonusType.BOSS_EXTENDED,
            current: false,
            possible(state) {
                return (
                    (has_all_skulls(one_two, state) ||
                        has_electricity(state)) &&
                    can_break_rodent_wall(state)
                );
            },
        },
    ],
};

const one_three: LevelData = {
    name: "1-3: HALLS OF SACRED REMAINS",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return has_all_skulls(one_three, state) && has_good_weapon(state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_blue_skull(one_three, state) ||
                has_red_skull(one_three, state)
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [
        { current: false, possible: can_break_glass },
        always_possible(),
        always_possible(),
        { current: false, possible: can_slide },
        { current: false, possible: can_slide },
    ],

    bonuses: [
        // Tundra/Agony count as the challenge, not a boss check
        {
            name: "Limbo Switch III",
            type: BonusType.SWITCH_LIMBO,
            current: false,
            possible: (state) => has_all_skulls(one_three, state),
        },
    ],
};

const one_four: LevelData = {
    name: "1-4: CLAIR DE LUNE",

    unlocked: false,
    skulls: [
        SkullType.BLUE_EMPTY,
        SkullType.BLUE_EMPTY,
        SkullType.BLUE_EMPTY,
        SkullType.BLUE_EMPTY,
    ],

    challenge: {
        current: false,
        possible() {
            // TODO: Is the glass normal glass?
            return true;
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            // Window
            if (one_four.challenge.possible(state)) {
                return RankType.PERFECT;
            }

            // Skulls
            if (
                one_four.skulls.filter((skull) => skull == SkullType.BLUE)
                    .length >= 3
            ) {
                return RankType.PERFECT;
            }

            return RankType.NONE;
        },
    },

    secrets: [],

    bonuses: [
        {
            name: "Limbo Switch IV",
            type: BonusType.SWITCH_LIMBO,
            ...always_possible(),
        },
        {
            name: "Slab Revolver",
            type: BonusType.WEAPON,
            current: false,
            possible(state) {
                if (state.settings.randomize_limbo_switches) {
                    // TODO: Check when all switches have been gotten
                    return false;
                } else {
                    // Need to have access to every switch
                    return [one_one, one_two, one_three, one_four]
                        .flatMap((level) => level.bonuses)
                        .filter((bonus) => bonus.type == BonusType.SWITCH_LIMBO)
                        .every((bonus) => bonus.possible(state));
                }
            },
        },
        {
            name: "V2",
            type: BonusType.BOSS_STANDARD,
            current: false,
            possible: has_good_weapon,
        },
        {
            name: "Knuckleblaster",
            type: BonusType.WEAPON,
            current: false,
            possible: has_good_weapon,
        },
        {
            name: "Hank",
            type: BonusType.HANK,
            current: false,
            possible: (state) => has_blue_skull(one_four, state),
        },
    ],
};

const one_s: SecretLevelData = {
    name: "1-S: THE WITLESS",
    possible(state) {
        return (
            one_one.unlocked &&
            state.arsenal.primaries.marksman &&
            state.arsenal.secondaries.marksman
        );
    },
    current: false,
    skulls: [],
};

export default {
    name: "LIMBO",
    levels: [one_one, one_two, one_three, one_four],
    secret: one_s,
} satisfies LayerData as LayerData;
