import { ArsenalLayout } from "../types";

export default {
    weapons: [
        {
            name: "Revolvers",
            variants: [
                { name: "Piercer", target: "piercer" },
                { name: "Marksman", target: "marksman" },
                { name: "Sharpshooter", target: "sharpshooter" },
            ],
            alternate: {
                target: "pistols",
                default: "Revolver",
                alternate: "Slab Revolver",
            },
        },
        {
            name: "Shotguns",
            variants: [
                { name: "Core Eject", target: "core_eject" },
                { name: "Pump Charge", target: "overpump" },
                { name: "Sawed On", target: "sawed_on" },
            ],
            alternate: {
                target: "shotguns",
                default: "Shotgun",
                alternate: "Impact Hammer",
            },
        },
        {
            name: "Nailguns",
            variants: [
                { name: "Attractor", target: "attractor" },
                { name: "Overheat", target: "overheat" },
                { name: "Jumpstart", target: "jumpstart" },
            ],
            alternate: {
                target: "nailguns",
                default: "Nailgun",
                alternate: "Sawblade Launcher",
            },
        },
        {
            name: "Railcannons",
            variants: [
                { name: "Electric", target: "electric" },
                { name: "Screwdriver", target: "screwdriver" },
                { name: "Malicious", target: "malicious" },
            ],
        },
        {
            name: "Rocket Launchers",
            variants: [
                { name: "Freezeframe", target: "freezeframe" },
                { name: "SRS Cannon", target: "cannon" },
                { name: "Firestarter", target: "firestarter" },
            ],
        },
    ],
    arms: [
        {
            name: "Feedbacker",
            target: "feedbacker",
        },
        {
            name: "Knuckeblaster",
            target: "knuckleblaster",
        },
        {
            name: "Whiplash",
            target: "whiplash",
        },
    ],
    movement: { _: void 0 },
} satisfies ArsenalLayout as ArsenalLayout;
