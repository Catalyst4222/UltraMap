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
    can_grab,
    can_slide,
    has_all_skulls,
    has_blue_skull,
    has_coins,
    has_red_skull,
} from "../logic";
import { level_5_1 } from "./extra_logic";

const five_one: LevelData = {
    name: "5-1: IN THE WAKE OF POSEIDON",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.BLUE_EMPTY, SkullType.BLUE_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return has_all_skulls(five_one, state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_all_skulls(five_one, state)
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [
        always_possible(),
        always_possible(),
        always_possible(), // High up
        always_possible(),
        {
            current: false,
            possible: (state) => has_all_skulls(five_one, state),
        },
    ],

    bonuses: [],
};

const five_two: LevelData = {
    name: "5-2: WAVES OF THE STARLESS SEA",

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
            return has_blue_skull(five_two, state)
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [
        always_possible(), // needs sliding or big movement
        always_possible(),
        always_possible(),
        always_possible(),
        {
            current: false,
            possible: (state) => has_blue_skull(five_two, state),
        },
    ],

    bonuses: [],
};

const five_three: LevelData = {
    name: "5-3: SHIP OF FOOLS",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return has_all_skulls(five_three, state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_blue_skull(five_three, state) ||
                has_red_skull(five_three, state)
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [
        {
            current: false,
            possible: (state) => has_blue_skull(five_three, state),
        },
        always_possible(), // Mmmmaybe some weird destructable stuff?
        {
            current: false,
            possible: (state) => has_all_skulls(five_three, state),
        },
        {
            current: false,
            possible: (state) =>
                has_blue_skull(five_three, state) ||
                has_red_skull(five_three, state),
        },
        {
            current: false,
            possible: (state) =>
                has_blue_skull(five_three, state) ||
                has_red_skull(five_three, state),
        },
    ],

    bonuses: [
        {
            name: "Rocket Launcher",
            type: BonusType.WEAPON,
            current: false,
            possible: (state) =>
                has_blue_skull(five_three, state) ||
                has_red_skull(five_three, state),
        },
        {
            name: "Hank Jr.",
            type: BonusType.HANK,
            current: false,
            possible: (state) => has_all_skulls(five_three, state),
        },
    ],
};

const five_four: LevelData = {
    name: "5-4: LEVIATHAN",

    unlocked: false,
    skulls: [],

    challenge: always_possible(), // Slam storage

    rank: always_perfectable(),

    secrets: [],

    bonuses: [
        {
            name: "Leviathan",
            type: BonusType.BOSS_STANDARD,
            ...always_possible(),
        },
    ],
};

const five_s: SecretLevelData = {
    name: "5-S: I ONLY SAY MORNING",
    possible(state) {
        return (
            five_one.unlocked &&
            level_5_1(state) &&
            can_grab(state) &&
            has_all_skulls(five_one, state) &&
            can_slide(state)
        );
    },
    current: false,
    skulls: [],
};

export default {
    name: "WRATH",
    levels: [five_one, five_two, five_three, five_four],
    secret: five_s,
} satisfies LayerData as LayerData;
