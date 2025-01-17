import { BonusType, LayerData, LevelData } from "../../types";
import {
    always_perfectable,
    always_perfectable_if,
    always_possible,
    can_slide,
} from "../logic";
import { jump_3_2 } from "./extra_logic";

const three_one: LevelData = {
    name: "3-1: BELLY OF THE BEAST",

    unlocked: false,
    skulls: [],

    challenge: always_possible(),

    rank: always_perfectable(),

    secrets: [
        always_possible(),
        always_possible(),
        always_possible(),
        { current: false, possible: can_slide },
        always_possible(),
    ],

    bonuses: [],
};

const three_two: LevelData = {
    name: "3-2: IN THE FLESH",

    unlocked: false,
    skulls: [],

    challenge: {
        current: false,
        possible(state) {
            return can_slide(state) && jump_3_2(state);
        },
    },

    rank: always_perfectable_if((state) => can_slide(state) && jump_3_2(state)),

    secrets: [],

    bonuses: [
        {
            name: "Gabriel",
            type: BonusType.BOSS_STANDARD,
            current: false,
            possible(state) {
                return can_slide(state) && jump_3_2(state);
            },
        },
    ],
};

export default {
    name: "GLUTTONY",
    levels: [three_one, three_two],
    secret: undefined,
} satisfies LayerData as LayerData;
