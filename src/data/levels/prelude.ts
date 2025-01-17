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
    can_break_glass,
    can_break_glass_or_walls,
    can_break_walls,
    can_slam_storage,
    can_slide,
    has_all_skulls,
    has_alt_shotgun,
    has_blue_skull,
    has_dashes,
    has_default_shotgun_explosions,
    has_general_jump,
    has_good_weapon,
    has_walljumps,
} from "../logic";
import { challenge_0_3, level_0_5, secret3_0_2 } from "./extra_logic";

const zero_one: LevelData = {
    name: "0-1: INTO THE FIRE",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible(state) {
            return can_break_glass(state);
        },
    },

    rank: always_perfectable(),
    // Logic has good weapon OR knuckleblaster, but since good weapon is done in display,
    // we can't really override it here

    secrets: [
        { current: false, possible: can_break_glass_or_walls },
        always_possible(),
        { current: false, possible: has_general_jump },
        { current: false, possible: has_general_jump },
        always_possible(), // Test this!
    ],

    bonuses: [
        {
            name: "Revolver",
            type: BonusType.WEAPON,
            ...always_possible(),
        },
    ],
};

const zero_two: LevelData = {
    name: "0-2: THE MEATGRINDER",

    unlocked: false,
    skulls: [SkullType.BLUE_EMPTY],

    challenge: {
        current: false,
        possible(state) {
            // Breaking the panels?
            return can_slide(state) && has_good_weapon(state);
        },
    },

    rank: always_perfectable(),

    secrets: [
        always_possible(),
        always_possible(),
        { current: false, possible: secret3_0_2 },
        { current: false, possible: can_slide },
        always_possible(),
    ],

    bonuses: [],
};

const zero_three: LevelData = {
    name: "0-3: DOUBLE DOWN",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible(state) {
            return challenge_0_3(state) && has_good_weapon(state);
        },
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return has_good_weapon(state)
                ? can_break_walls(state)
                    ? RankType.PERFECT
                    : challenge_0_3(state)
                        ? RankType.PASS
                        : RankType.NONE
                : RankType.NONE;
        },
    },

    secrets: [
        { current: false, possible: has_general_jump },
        {
            current: false,
            possible: (state) => can_break_walls(state) || challenge_0_3(state),
        },
        { current: false, possible: can_break_walls },
    ],

    bonuses: [
        {
            name: "Shotgun",
            type: BonusType.WEAPON,
            current: false,
            possible: has_good_weapon,
        },
    ],
};

const zero_four: LevelData = {
    name: "0-4: A ONE-MACHINE ARMY",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible(state) {
            return can_slide(state); // May change in the next update?
        },
    },

    rank: always_perfectable(),

    secrets: [
        { current: false, possible: has_general_jump },
        { current: false, possible: can_break_glass },
        { current: false, possible: can_slide },
    ],

    bonuses: [],
};

const zero_five: LevelData = {
    name: "0-5: CERBERUS",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible: (state) => level_0_5(state) && has_dashes(state),
    },

    rank: {
        current: RankType.NONE,
        possible(state) {
            return level_0_5(state) ? RankType.PERFECT : RankType.NONE;
        },
    },

    secrets: [],

    bonuses: [
        {
            name: "Cerberus",
            type: BonusType.BOSS_STANDARD,
            current: false,
            possible: level_0_5,
        },
    ],
};

const zero_s: SecretLevelData = {
    name: "0-S: SOMETHING WICKED",
    skulls: [SkullType.RED_EMPTY, SkullType.BLUE_EMPTY],
    current: false,
    possible(state) {
        // Getting to the skull in 0-2
        switch (true) {
            case has_walljumps(state, 3):
            case can_slam_storage(state):
            case has_default_shotgun_explosions(state):
            case has_alt_shotgun(state):
            case state.arsenal.primaries.malicious:
            case state.arsenal.primaries.rocket:
                break;
            default:
                return false;
        }

        return (
            zero_two.unlocked &&
            has_blue_skull(zero_two, state) &&
            has_all_skulls(zero_s as unknown as LevelData, state)
        );
    },
};

export default {
    name: "OVERTURE: THE MOUTH OF HELL", // Yeah, that's the real name
    levels: [zero_one, zero_two, zero_three, zero_four, zero_five],
    secret: zero_s,
} satisfies LayerData as LayerData;
