/* eslint-disable indent */
import { State } from "../../types";
import {
    can_break_glass,
    can_grab,
    can_projectile_boost,
    can_punch,
    can_slam_storage,
    has_alt_shotgun,
    has_blue_skull,
    has_dashes,
    has_default_shotgun_explosions,
    has_standard_shotgun,
    has_walljumps,
} from "../logic";

export function challenge_0_3(state: State) {
    // Upwards skip in starting room, modified from randomizer logic

    const {
        arsenal: { primaries, secondaries },
    } = state;

    // "Independent" methods
    switch (true) {
        case primaries.malicious:
        case primaries.freezeframe && secondaries.freezeframe:
        case primaries.core_eject &&
            secondaries.core_eject &&
            has_alt_shotgun(state):
        case primaries.overpump &&
            secondaries.overpump &&
            has_alt_shotgun(state):
            return true;
    }

    // Anything that needs glass to break
    if (can_break_glass(state)) {
        switch (true) {
            case can_slam_storage(state):
            case primaries.overpump && secondaries.overpump:
                // Possibly something else
                return true;
        }
    }

    return false;
}

export function secret3_0_2(state: State) {
    const { primaries, secondaries } = state.arsenal;

    switch (true) {
        case has_walljumps(state, 2):
        case has_dashes(state) && has_walljumps(state):
        case can_slam_storage(state):
        case primaries.core_eject && secondaries.core_eject:
        case can_projectile_boost(state):
        case primaries.malicious:
        case primaries.rocket:
            return true;
        default:
            return false;
    }
}

export function level_0_5(state: State) {
    // Platform to the cerberus room

    const {
        arsenal: { primaries, movement },
    } = state;

    switch (true) {
        case movement.slide && (movement.walljumps >= 1 || has_dashes(state)):
        case primaries.rocket:
        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):
        case primaries.malicious:
            return true;
        default:
            return false;
    }
}

export function jump_1_1(state: State) {
    // Get up to Limbo Slab I
    const { primaries, movement } = state.arsenal;

    switch (true) {
        case movement.slam:
        case primaries.rocket:
        case has_default_shotgun_explosions(state):
        case primaries.malicious:
            return true;
        default:
            return false;
    }
}

export function secret1_2_1(state: State) {
    // Getting across the gap

    const { primaries, movement } = state.arsenal;

    switch (true) {
        case has_dashes(state):
        case movement.slide:
        case has_walljumps(state):
        case has_default_shotgun_explosions(state):
        case primaries.malicious:
        case primaries.rocket:
            return true;
        default:
            return false;
    }
}

export function secret3_2_1(state: State) {
    // The one across the gap
    // Will be changed next update

    const { primaries, secondaries } = state.arsenal;

    if (primaries.freezeframe && secondaries.freezeframe) {
        return true;
    }

    if (has_dashes(state, 2) || (has_dashes(state) && has_walljumps(state))) {
        switch (true) {
            case primaries.malicious:
            case primaries.core_eject &&
                secondaries.core_eject &&
                has_standard_shotgun(state):
            case primaries.overpump && secondaries.overpump:
                return true;
        }
    }

    return false;
}

export function bridge_and_tower_2_1(state: State) {
    const { primaries, movement } = state.arsenal;

    switch (true) {
        case movement.slam:
        case has_walljumps(state) && has_dashes(state):
        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):
        case primaries.malicious:
        case primaries.rocket:
            return true;
        default:
            return false;
    }
}

export function challenge_2_1(state: State) {
    // Probably the worst function in the entire logic

    const { primaries, secondaries, alternates, arms, movement } =
        state.arsenal;

    let temp1;
    let temp2;
    let temp3;

    switch (true) {
        case primaries.pistol && alternates.pistols.alternate:
        case primaries.core_eject &&
            secondaries.core_eject &&
            alternates.shotguns.default:
        case primaries.overheat &&
            secondaries.overheat &&
            alternates.nailguns.default:
        case primaries.electric:
        case primaries.malicious:
        case primaries.rocket:
            temp1 = true;
            break;
        default:
            temp1 = false;
    }

    switch (true) {
        case has_dashes(state):
        case movement.slide:
        case has_walljumps(state, 3):
        case primaries.core_eject &&
            secondaries.core_eject &&
            alternates.shotguns.default:
        case primaries.malicious:
        case primaries.rocket:
            temp2 = true;
            break;
        default:
            temp2 = false;
    }

    // "shostd1_fire2 without dash can be used to do either but not both"
    if (
        !(
            primaries.core_eject &&
            secondaries.core_eject &&
            alternates.shotguns.default
        )
    ) {
        temp3 = false;
    } else {
        switch (true) {
            case movement.slide:
            case has_walljumps(state, 3):
            case has_dashes(state):
            case primaries.pistol && alternates.pistols.alternate:
            case primaries.overheat &&
                secondaries.overheat &&
                alternates.nailguns.default:
            case primaries.electric:
            case arms.knuckleblaster:
                temp3 = true;
                break;
            default:
                temp3 = false;
        }
    }

    if (!((temp1 && temp2) || temp3)) {
        return false;
    }

    // "reach end of level"
    if (primaries.freezeframe && secondaries.freezeframe) return true;
    if (can_slam_storage(state)) return true;

    if (
        has_walljumps(state, 3) &&
        has_dashes(state, 2) &&
        (primaries.malicious || (primaries.overpump && secondaries.overpump))
    ) {
        return true;
    }

    return false;
}

export function secret1_2_2(state: State) {
    const { primaries, movement } = state.arsenal;

    switch (true) {
        case can_grab(state):
        case movement.slam:
        case primaries.pistol:
        case primaries.shotgun:
        case primaries.nailgun:
        case primaries.electric:
        case primaries.malicious:
        case primaries.rocket:
            return true;
        default:
            return false;
    }
}

export function challenge_2_2(state: State) {
    const { primaries, secondaries, alternates, arms, movement } =
        state.arsenal;

    // "pass corridor"
    switch (true) {
        case primaries.pistol:
        case primaries.shotgun && alternates.shotguns.default:
        case primaries.nailgun:
        case primaries.electric:
        case movement.slide:
        case has_dashes(state):
        case can_punch(state):
            break;
        default:
            return false;
    }

    if (primaries.freezeframe && secondaries.freezeframe) return true;

    if (
        primaries.shotgun &&
        alternates.shotguns.default &&
        movement.slide &&
        has_dashes(state)
    ) {
        return true;
    }

    if (!(movement.slide && has_dashes(state))) {
        // Movement needed, badly
        return false;
    }

    switch (true) {
        case primaries.pistol:
        case can_projectile_boost(state):
        case primaries.attractor:
        case primaries.overheat &&
            secondaries.overheat &&
            alternates.nailguns.default:
        case primaries.jumpstart && alternates.nailguns.default:
        case primaries.rocket:
        case arms.whiplash:
            return true;
        default:
            return false;
    }
}

export function secret3_2_3(state: State) {
    const { primaries, movement } = state.arsenal;

    switch (true) {
        case movement.slam:
        case primaries.malicious:
        case has_walljumps(state):
        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):
        case primaries.rocket:
            return true;
        default:
            return false;
    }
}

export function jump_3_2(state: State) {
    const { primaries, movement } = state.arsenal;

    switch (true) {
        case movement.slam:
        case has_walljumps(state):
        case has_dashes(state):
        case has_default_shotgun_explosions(state):
        case has_alt_shotgun(state):
        case primaries.malicious:
        case primaries.rocket:
            return true;
        default:
            return false;
    }
}

export function challenge_4_1(state: State) {
    const { primaries, secondaries, alternates, movement } = state.arsenal;

    if (primaries.freezeframe && secondaries.freezeframe) return true;

    if (has_walljumps(state, 2) && has_dashes(state, 2) && movement.slam)
        return true;

    if (has_walljumps(state) || movement.slam) {
        switch (true) {
            case primaries.malicious:
            case primaries.core_eject &&
                secondaries.core_eject &&
                alternates.shotguns.default:
            case primaries.overpump && secondaries.overpump:
                return true;
        }
    }

    return false;
}

export function level_4_3(state: State) {
    const { primaries, secondaries, arms } = state.arsenal;

    // This doesn't feel like everything, but it's better to mimic the randomizer
    switch (true) {
        case arms.feedbacker:
        case arms.knuckleblaster:
        case primaries.core_eject && secondaries.core_eject:
        case can_projectile_boost(state): // This never runs because it needs feedbacker but /shrug
        case primaries.malicious:
            return true;
        default:
            return false;
    }
}

export function level_4_4(state: State) {
    const { primaries, secondaries, arms, movement } = state.arsenal;

    if (arms.whiplash && has_blue_skull(state.acts[2][1].levels[4], state)) {
        return true;
    }

    switch (true) {
        case has_dashes(state) && has_walljumps(state):
        case has_walljumps(state, 2):
        case movement.slam:
        case primaries.freezeframe && secondaries.freezeframe:
            return true;
        default:
            return false;
    }
}

export function level_5_1(state: State) {
    const { primaries, secondaries, arms, movement } = state.arsenal;

    switch (true) {
        case arms.whiplash:
        case primaries.freezeframe && secondaries.freezeframe:
        case movement.slam && has_dashes(state, 2) && has_walljumps(state, 3):
            return true;
        default:
            return false;
    }
}

export function level_6_2(state: State) {
    const { primaries, secondaries, movement } = state.arsenal;

    switch (true) {
        case movement.slam:
        case has_walljumps(state, 2):
        case primaries.core_eject && secondaries.core_eject:
        case primaries.overpump && secondaries.overpump:
        case primaries.malicious:
        case primaries.freezeframe && secondaries.freezeframe:
            return true;
        default:
            return false;
    }
}
