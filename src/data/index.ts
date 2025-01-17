/* I don't really have a better way of storing what needs what to happen,
   so everything is stored in this folder */

import settings from "./settings";
import { State } from "../types";
import arsenal from "./arsenal";
import levels from "./levels";

export const state: State = {
    arsenal,
    acts: levels,
    page: "levels",
    settings: settings,
};
