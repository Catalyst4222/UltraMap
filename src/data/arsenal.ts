import { Arsenal, Secondaries } from "../types";
import { state } from ".";

// This lets us ignore weapon secondaries if the setting isn't enabled
const secondaries = new Proxy(
    {
        piercer: false,
        marksman: false,
        sharpshooter: false,

        core_eject: false,
        overpump: false,
        sawed_on: false,

        attractor: false,
        overheat: false,
        jumpstart: false,

        freezeframe: false,
        cannon: false,
        firestarter: false,
    } as Secondaries,

    {
        get(target, name: keyof Secondaries) {
            if (!state.settings.randomize_secondary_fire) {
                // Don't care about secondaries if it's not randomized
                return true;
            } else {
                return target[name];
            }
        },
    }
);

export default {
    primaries: {
        piercer: false,
        marksman: false,
        sharpshooter: false,
        get pistol() {
            return this.piercer || this.marksman || this.sharpshooter;
        },

        core_eject: false,
        overpump: false,
        sawed_on: false,
        get shotgun() {
            return this.core_eject || this.overpump || this.sawed_on;
        },

        attractor: false,
        overheat: false,
        jumpstart: false,
        get nailgun() {
            return this.attractor || this.overheat || this.jumpstart;
        },

        electric: false,
        malicious: false,
        screwdriver: false,
        get railgun() {
            return this.electric || this.malicious || this.screwdriver;
        },

        freezeframe: false,
        cannon: false,
        firestarter: false,
        get rocket() {
            return this.freezeframe || this.cannon || this.firestarter;
        },
    },
    secondaries,
    arms: {
        feedbacker: false,
        knuckleblaster: false,
        whiplash: false,
    },
    alternates: {
        pistols: {
            default: true,
            alternate: false,
        },
        shotguns: {
            default: true,
            alternate: false,
        },
        nailguns: {
            default: true,
            alternate: false,
        },
    },
    movement: {
        dashes: 3,
        walljumps: 3,
        slam: true,
        slide: true,
    },
} satisfies Arsenal as Arsenal;
