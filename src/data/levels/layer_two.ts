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
    always_possible,
    can_break_walls,
    can_slam_storage,
    can_slide,
    has_all_skulls,
    has_blue_skull,
    has_general_jump,
    has_good_weapon,
} from "../logic";
import {
    bridge_and_tower_2_1,
    challenge_2_1,
    challenge_2_2,
    secret1_2_1,
    secret1_2_2,
    secret3_2_1,
    secret3_2_3,
} from "./extra_logic";

const two_one: LevelData = {
    name: "2-1: BRIDGEBURNER",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible(state) {
            return challenge_2_1(state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return bridge_and_tower_2_1(state)
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [
        {
            current: false,
            possible: (state) =>
                can_slam_storage(state) ||
                (secret1_2_1(state) && can_break_walls(state)),
        },
        always_possible(),
        { current: false, possible: secret3_2_1 },
        always_possible(),
        { current: false, possible: bridge_and_tower_2_1 },
    ],

    bonuses: [],
};

const two_two: LevelData = {
    name: "2-2: DEATH AT 20,000 VOLTS",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible(state) {
            return challenge_2_2(state);
        },
    },

    rank: always_perfectable(),

    secrets: [
        { current: false, possible: secret1_2_2 },

        { current: false, possible: has_general_jump },
        { current: false, possible: has_general_jump },
        { current: false, possible: can_slide },
        { current: false, possible: can_break_walls },
    ],

    bonuses: [
        {
            name: "Railcannon",
            type: BonusType.WEAPON,
            ...always_possible(),
        },
    ],
};

const two_three: LevelData = {
    name: "2-3: SHEER HEART ATTACK",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return (
                secret3_2_3(state) &&
                can_slide(state) &&
                can_break_walls(state) &&
                has_blue_skull(two_three, state)
            );
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            if (has_all_skulls(two_three, state)) return RankType.PERFECT;
            if (
                secret3_2_3(state) &&
                has_blue_skull(two_three, state) &&
                can_slide(state)
            )
                return RankType.PASS;
            return RankType.NONE;
        },
    },

    secrets: [
        always_possible(),
        { current: false, possible: can_slide },
        {
            current: false,
            possible: (state) =>
                secret3_2_3(state) && has_blue_skull(two_three, state),
        },
        {
            current: false,
            possible: (state) => has_blue_skull(two_three, state),
        },
        always_possible(),
    ],

    bonuses: [],
};

const two_four: LevelData = {
    name: "2-4: COURT OF THE CORPSE KING",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return (
                state.arsenal.arms.feedbacker && has_all_skulls(two_four, state)
            );
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_all_skulls(two_four, state)
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [],

    bonuses: [
        {
            name: "Corpse of King Minos",
            type: BonusType.BOSS_STANDARD,
            current: false,
            possible: (state) =>
                has_all_skulls(two_four, state) && has_good_weapon(state),
        },
    ],
};

const two_s: SecretLevelData = {
    name: "2-S: ALL-IMPERFECT LOVE SONG",
    skulls: [],
    current: false,
    possible(state) {
        return (
            two_three.unlocked &&
            secret3_2_3(state) &&
            can_slide(state) &&
            has_blue_skull(two_three, state)
        );
    },
};

export default {
    name: "LUST",
    levels: [two_one, two_two, two_three, two_four],
    secret: two_s,
} satisfies LayerData as LayerData;
