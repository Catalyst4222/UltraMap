import { LevelData, RankType, SkullType, State } from "../types";

/* Randomizer's logic */

export function has_standard_shotgun(state: State) {
    return (
        state.arsenal.alternates.shotguns.default &&
        state.arsenal.primaries.shotgun
    );
}
export function has_alt_shotgun(state: State) {
    return (
        state.arsenal.alternates.shotguns.alternate &&
        state.arsenal.primaries.shotgun
    );
}
export function has_default_shotgun_explosions(state: State) {
    const {
        arsenal: { primaries, secondaries },
    } = state;

    switch (true) {
        case primaries.core_eject && secondaries.core_eject:
        case primaries.overpump && secondaries.overpump:
        case can_projectile_boost(state):
            return true;
        default:
            return false;
    }
}

export function can_punch(state: State) {
    return state.arsenal.arms.feedbacker || state.arsenal.arms.knuckleblaster;
}

export function can_grab(state: State) {
    return can_punch(state) || state.arsenal.arms.whiplash;
}

export function can_break_idol(state: State) {
    return (
        can_punch(state) ||
        has_alt_shotgun(state) ||
        state.arsenal.movement.slam
    );
}

export function can_projectile_boost(state: State) {
    return state.arsenal.arms.feedbacker && has_standard_shotgun(state);
}

export function has_electricity({ arsenal }: State) {
    if (arsenal.primaries.electric) return true;

    if (arsenal.primaries.jumpstart && arsenal.secondaries.jumpstart)
        return true;

    return false;
}

export function can_slam_storage(state: State) {
    return has_walljumps(state) && state.arsenal.movement.slam;
}

export function has_good_weapon(state: State) {
    // "Good" as defined by the randomizer
    const { primaries, alternates, movement } = state.arsenal;

    // Any amount of dodging
    if (!movement.slide && !movement.dashes) {
        return false;
    }

    switch (true) {
        case primaries.pistol:
        case has_default_shotgun_explosions(state):
        case primaries.jumpstart && alternates.nailguns.default:
            return true;
        default:
            return false;
    }
}

export function can_break_glass(state: State) {
    const {
        arsenal: { primaries, secondaries, arms, alternates },
    } = state;

    switch (true) {
        case primaries.piercer && secondaries.piercer:
        case primaries.marksman && secondaries.marksman:
        case primaries.sharpshooter && secondaries.sharpshooter:
        case alternates.pistols.alternate && primaries.pistol:

        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):

        case primaries.electric:
        case primaries.malicious:

        case primaries.rocket:
        case arms.knuckleblaster:
            return true;

        default:
            return false;
    }
}

export function can_break_walls(state: State) {
    const {
        arsenal: { primaries, secondaries, arms, alternates },
    } = state;

    switch (true) {
        case alternates.pistols.alternate && primaries.pistol:

        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):

        // wtf
        case primaries.overheat &&
            secondaries.overheat &&
            alternates.nailguns.default:

        case primaries.electric:
        case primaries.malicious:
        case primaries.rocket:
        case arms.knuckleblaster:
            return true;

        default:
            return false;
    }
}

export function can_break_rodent_wall(state: State) {
    const {
        arsenal: { primaries, arms, alternates },
    } = state;

    switch (true) {
        case alternates.pistols.alternate && primaries.pistol:

        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):

        case primaries.electric:
        case primaries.malicious:
        case primaries.rocket:
        case arms.knuckleblaster:
            return true;

        default:
            return false;
    }
}

export function can_break_glass_or_walls(state: State) {
    const {
        arsenal: { primaries, secondaries, arms, alternates },
    } = state;

    switch (true) {
        case primaries.piercer && secondaries.piercer:
        case primaries.marksman && secondaries.marksman:
        case primaries.sharpshooter && secondaries.sharpshooter:
        case alternates.pistols.alternate && primaries.pistol:

        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):

        case primaries.overheat &&
            secondaries.overheat &&
            alternates.nailguns.default:

        case primaries.electric:
        case primaries.malicious:

        case primaries.rocket:
        case arms.knuckleblaster:
            return true;

        default:
            return false;
    }
}

export function has_general_jump(state: State, walljumps_needed = 1) {
    const {
        arsenal: { primaries, movement },
    } = state;

    switch (true) {
        case movement.slam:
        case movement.walljumps >= walljumps_needed:

        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):

        case primaries.malicious:
        case primaries.rocket:
            return true;
        default:
            return false;
    }
}

/* Weapon Logic */

export function has_coins({ arsenal }: State) {
    return arsenal.primaries.marksman && arsenal.secondaries.marksman;
}

export function has_explosion(state: State) {
    // "default" explosions

    const {
        arsenal: { primaries, secondaries, arms, alternates },
    } = state;

    switch (true) {
        case arms.feedbacker &&
            primaries.shotgun &&
            alternates.shotguns.default:
        case primaries.core_eject && secondaries.core_eject:
        case primaries.overpump && secondaries.overpump:
        case primaries.malicious:
            return true;

        default:
            return false;
    }
}

export function has_blast(state: State) {
    // think this is done?
    // "default" blasts (non-damaging)

    const {
        arsenal: { primaries, arms },
    } = state;

    switch (true) {
        case has_explosion(state):
        case primaries.rocket:
        case arms.knuckleblaster:
            return true;

        default:
            return false;
    }
}

export function can_break_walls_(state: State) {
    // not done
    const {
        arsenal: { primaries, secondaries, alternates },
    } = state;

    switch (true) {
        case has_blast(state):
        case alternates.pistols.alternate && primaries.pistol:
        case alternates.shotguns.alternate && primaries.shotgun:
        case alternates.nailguns.default &&
            primaries.overheat &&
            secondaries.overheat: // Somehow??
        case primaries.electric:
            return true;

        default:
            return false;
    }

    // return false; // TODO
}

/* Skull Logic */

export function has_blue_skull(level: LevelData, state: State) {
    if (!can_grab(state)) return false;
    if (!state.settings.randomize_skulls) return true;

    return level.skulls.includes(SkullType.BLUE);
}

export function has_red_skull(level: LevelData, state: State) {
    if (!can_grab(state)) return false;
    if (!state.settings.randomize_skulls) return true;
    return level.skulls.includes(SkullType.RED);
}

export function has_all_skulls(level: LevelData, state: State) {
    if (!can_grab(state)) return false;
    if (!state.settings.randomize_skulls) return true;
    return level.skulls.every(
        (skull) => skull == SkullType.BLUE || skull == SkullType.RED
    );
}

/* QoL */

export function always_possible() {
    return { current: false, possible: () => true };
}

export function always_perfectable() {
    return { current: RankType.NONE, possible: () => RankType.PERFECT };
}

export function always_perfectable_if(cb: (state: State) => boolean) {
    return {
        current: RankType.NONE,
        possible(state: State) {
            return cb(state) ? RankType.PERFECT : RankType.NONE;
        },
    };
}

export function has_dashes(state: State, num = 1) {
    return state.arsenal.movement.dashes >= num;
}

export function has_walljumps(state: State, num = 1) {
    return state.arsenal.movement.walljumps >= num;
}

export function can_slide(state: State) {
    return state.arsenal.movement.slide;
}
