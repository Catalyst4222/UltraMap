export type Weapon = keyof {
    piercer: boolean;
    marksman: boolean;
    sharpshooter: boolean;

    core_eject: boolean;
    overpump: boolean;
    sawed_on: boolean;

    attractor: boolean;
    overheat: boolean;
    jumpstart: boolean;

    electric: boolean;
    malicious: boolean;
    screwdriver: boolean;

    freezeframe: boolean;
    cannon: boolean;
    firestarter: boolean;
};

type Primaries = {
    pistol: boolean;
    piercer: boolean;
    marksman: boolean;
    sharpshooter: boolean;

    shotgun: boolean;
    core_eject: boolean;
    overpump: boolean;
    sawed_on: boolean;

    nailgun: boolean;
    attractor: boolean;
    overheat: boolean;
    jumpstart: boolean;

    railgun: boolean;
    electric: boolean;
    malicious: boolean;
    screwdriver: boolean;

    rocket: boolean;
    freezeframe: boolean;
    cannon: boolean;
    firestarter: boolean;
};

export type Secondaries = {
    piercer: boolean;
    marksman: boolean;
    sharpshooter: boolean;

    core_eject: boolean;
    overpump: boolean;
    sawed_on: boolean;

    attractor: boolean;
    overheat: boolean;
    jumpstart: boolean;

    // Railguns don't have secondaries
    electric: never;
    malicious: never;
    screwdriver: never;

    freezeframe: boolean;
    cannon: boolean;
    firestarter: boolean;
};

type Arms = {
    feedbacker: boolean;
    knuckleblaster: boolean;
    whiplash: boolean;
};

type Alternates = {
    pistols: {
        default: boolean;
        alternate: boolean;
    };
    shotguns: {
        default: boolean;
        alternate: boolean;
    };
    nailguns: {
        default: boolean;
        alternate: boolean;
    };
};

export type Movement = {
    dashes: number; // 0-3
    walljumps: number; // 0-3
    slam: boolean;
    slide: boolean;
};

export type Arsenal = {
    primaries: Primaries;
    secondaries: Secondaries;
    arms: Arms;
    alternates: Alternates;
    movement: Movement;
};

export type WeaponLayout = {
    name: string;
    variants: Array<{ name: string; target: keyof Secondaries }>;
    alternate?: {
        target: keyof Alternates;
        default: string;
        alternate: string;
    };
};

export type ArmLayout = {
    name: string;
    target: keyof Arms;
};

export type ArsenalLayout = {
    weapons: WeaponLayout[];
    arms: ArmLayout[];
    movement: {
        _: void;
    };
};

export type ChallengeData = {
    current: boolean;
    possible: (state: State) => boolean;
};

export enum RankType {
    NONE,
    PASS,
    PERFECT,
}

export type RankData = {
    current: RankType;
    possible: (state: State) => RankType;
};

export enum SkullType {
    RED,
    RED_EMPTY,
    BLUE,
    BLUE_EMPTY,
}

export type SecretData = {
    current: boolean;
    possible: (state: State) => boolean;
};

export enum BonusType {
    WEAPON,
    SWITCH_LIMBO,
    SWITCH_VIOLENCE,
    HANK,
    BOSS_STANDARD,
    BOSS_EXTENDED,
}

export type BonusData = {
    name: string;
    type: BonusType;
    current: boolean;
    possible: (state: State) => boolean;
};

export type LevelData = {
    // Info
    name: string;

    // Unlockables
    unlocked: boolean;
    skulls: SkullType[];

    // Check what can be gotten

    challenge: ChallengeData;
    rank: RankData;
    secrets: SecretData[];
    bonuses: BonusData[];
};

export type SecretLevelData = {
    name: string;
    possible: (state: State) => boolean;
    current: boolean;
    skulls: SkullType[];
};

export type LayerData = {
    name: string;
    levels: LevelData[];
    secret?: SecretLevelData;
};
export type ActData = LayerData[];

// Basically a copy of the template settings, not all will be used
export type Settings = {
    goal:
        | "0-5"
        | "1-4"
        | "2-4"
        | "3-2"
        | "4-4"
        | "5-4"
        | "6-2"
        | "7-2"
        | "P-1"
        | "P-2";
    goal_requirement: number;
    include_secret_mission_completion: boolean;
    unlock_type: "levels" | "layers";
    trap_percentage: number;
    boss_rewards: "disabled" | "standard" | "extended";
    challenge_rewards: boolean;
    p_rank_rewards: boolean;
    hank_rewards: boolean;
    randomize_clash_mode: boolean;
    fish_rewards: boolean;
    cleaning_rewards: boolean;
    chess_reward: boolean;
    rocket_race_rewards: boolean;
    starting_weapon:
        | "revolver"
        | "any_weapon"
        | "any_arm"
        | "any_weapon_or_arm";
    randomize_secondary_fire: boolean;
    start_with_arm: boolean;
    starting_stamina: number; // Possibly use this when importing
    starting_walljumps: number;
    start_with_slide: boolean;
    start_with_slam: boolean;
    revolver_form: "standard" | "alternate";
    shotgun_form: "standard" | "alternate";
    nailgun_form: "standard" | "alternate";
    randomize_skulls: boolean;
    randomize_limbo_switches: boolean;
    randomize_violence_switches: boolean;
    point_multiplier: number;
    ui_color_randomizer: "disabled" | "once" | "every_load";
    gun_color_randomizer: "disabled" | "once" | "every_load";
    music_randomizer: boolean;
    cybergrind_hints: boolean;
    death_link: boolean;
};

// don't forget terminal!

export type State = {
    arsenal: Arsenal;
    acts: ActData[];
    settings: Settings;
    page: "levels" | "arsenal" | "settings"; // Which screen the user is on
};
