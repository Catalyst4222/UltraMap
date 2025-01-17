import {
    BonusType,
    LayerData,
    LevelData,
    RankType,
    SkullType,
} from "../../types";
import {
    always_possible,
    can_break_idol,
    has_all_skulls,
    has_general_jump,
    has_good_weapon,
} from "../logic";
import { jump_3_2, level_6_2 } from "./extra_logic";

const six_one: LevelData = {
    name: "6-1: CRY FOR THE WEEPER",

    unlocked: false,
    skulls: [SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return has_all_skulls(six_one, state) && has_general_jump(state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_all_skulls(six_one, state) &&
                has_general_jump(state) &&
                can_break_idol(state)
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [
        always_possible(),
        { current: false, possible: (state) => has_all_skulls(six_one, state) },
        { current: false, possible: (state) => has_all_skulls(six_one, state) },
        {
            current: false,
            possible: (state) =>
                has_all_skulls(six_one, state) && has_general_jump(state),
        },
        {
            current: false,
            possible: (state) =>
                has_all_skulls(six_one, state) && has_general_jump(state, 2),
        },
    ],

    bonuses: [],
};

const six_two: LevelData = {
    name: "6-2: AESTHETICS OF HATE",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible(state) {
            return (
                level_6_2(state) &&
                state.arsenal.primaries.rocket &&
                has_good_weapon(state)
            );
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return level_6_2(state) ? RankType.PERFECT : RankType.NONE;
        },
    },

    secrets: [],

    bonuses: [
        {
            name: "Gabriel",
            type: BonusType.BOSS_STANDARD,
            current: false,
            possible(state) {
                return jump_3_2(state) && has_good_weapon(state);
            },
        },
    ],
};

export default {
    name: "HERESY",
    levels: [six_one, six_two],
    secret: undefined,
} satisfies LayerData as LayerData;
