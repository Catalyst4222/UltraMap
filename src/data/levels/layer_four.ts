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
    can_grab,
    has_all_skulls,
    has_blast,
    has_blue_skull,
    has_electricity,
    has_explosion,
    has_general_jump,
} from "../logic";

const four_one: LevelData = {
    name: "4-1: SLAVES TO POWER",

    unlocked: false,
    skulls: [],

    challenge: always_possible(),
    // check this once movement is done

    rank: always_perfectable(),

    secrets: [
        always_possible(),
        always_possible(),
        always_possible(),
        always_possible(),
        always_possible(), // You can go up in the end room
    ],

    bonuses: [],
};

const four_two: LevelData = {
    name: "4-2: GOD DAMN THE SUN",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY, SkullType.RED_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return has_all_skulls(four_two, state);
        },
    },

    // In theory, you p-rank minus insurrectionist,
    // kill a secret enemy, and leave through the secret exit
    rank: always_perfectable(),

    secrets: [
        always_possible(),
        always_possible(),
        always_possible(),
        { current: false, possible: has_blast },
        always_possible(),
    ],

    bonuses: [],
};

const four_three: LevelData = {
    name: "4-3: A SHOT IN THE DARK",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return has_explosion(state);
            // You also want the blue skull,
            // but it's (barely) possible without
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_explosion(state) //|| has_arms(state) // TODO: whiplash?
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [
        always_possible(),
        always_possible(), // Need slide
        always_possible(),
        { current: false, possible: can_break_walls },
        always_possible(), // Need slide
    ],

    bonuses: [
        {
            name: "Mysterious Druid Knight",
            type: BonusType.BOSS_EXTENDED,
            current: false,
            possible: (state) => has_blue_skull(four_three, state),
        },
    ],
};

const four_four: LevelData = {
    name: "4-4: CLAIR DE SOLEIL",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            return (
                has_blue_skull(four_four, state) && state.arsenal.arms.whiplash
            );
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return state.arsenal.arms.whiplash
                ? RankType.PERFECT
                : RankType.NONE;
        },
    },

    secrets: [],

    bonuses: [
        {
            name: "Sawblade Launcher",
            type: BonusType.WEAPON,
            current: false,
            possible: has_electricity, // TODO: Check if jumpstart needs the whiplash
        },
        {
            name: "V2",
            type: BonusType.BOSS_STANDARD,
            ...always_possible(),
        },
        {
            name: "Whiplash",
            type: BonusType.WEAPON,
            ...always_possible(),
        },
    ],
};

const four_s: SecretLevelData = {
    name: "4-S: CLASH OF THE BRANDICOOT",
    possible(state) {
        return (
            four_two.unlocked &&
            can_grab(state) &&
            (has_general_jump(state, 2) ||
                (state.arsenal.primaries.sharpshooter &&
                    state.arsenal.secondaries.sharpshooter))
        );
    },
    current: false,
    skulls: [],
};

export default {
    name: "GREED",
    levels: [four_one, four_two, four_three, four_four],
    secret: four_s,
} satisfies LayerData as LayerData;
