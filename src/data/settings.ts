import { Settings } from "../types";

const default_settings: Settings = {
    goal: "6-2",
    goal_requirement: 15,
    include_secret_mission_completion: true,
    unlock_type: "levels",
    trap_percentage: 25,
    boss_rewards: "disabled",
    challenge_rewards: false,
    p_rank_rewards: false,
    hank_rewards: false,
    randomize_clash_mode: false,
    fish_rewards: false,
    cleaning_rewards: false,
    chess_reward: false,
    rocket_race_rewards: false,
    starting_weapon: "any_weapon",
    randomize_secondary_fire: false,
    start_with_arm: true,
    starting_stamina: 3,
    starting_walljumps: 3,
    start_with_slide: true,
    start_with_slam: true,
    revolver_form: "standard",
    shotgun_form: "standard",
    nailgun_form: "standard",
    randomize_skulls: false,
    randomize_limbo_switches: false,
    randomize_violence_switches: false,
    point_multiplier: 1,
    ui_color_randomizer: "disabled",
    gun_color_randomizer: "disabled",
    music_randomizer: false,
    cybergrind_hints: true,
    death_link: false,
};

// Shallow copy so that we have the original to fall back to
const settings: Settings = { ...default_settings };

export default settings;
