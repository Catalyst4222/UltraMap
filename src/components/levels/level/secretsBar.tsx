import { has_good_weapon } from "../../../data/logic";
import { useGameState } from "../../../hooks";
import { ChallengeData, LevelData, RankType, SecretData } from "../../../types";
import Flex from "../../flex";

// I don't really like the use of all the magic nuumbers
// for heights and widths and whatnot, but I didn't find
// a cleaner way

function Challenge({
    challenge,
    levelUnlocked,
}: {
    challenge: ChallengeData;
    levelUnlocked: boolean;
}) {
    const [state, refresh] = useGameState();

    const accessible = levelUnlocked && challenge.possible(state);

    const fillColor = challenge.current
        ? accessible
            ? "white"
            : "grey"
        : "black";

    const borderColor = accessible ? "white" : "grey";

    return (
        <div
            id="challenge"
            onClick={() => {
                if (!levelUnlocked) return;
                challenge.current = !challenge.current;
                refresh();
            }}
            style={{
                aspectRatio: "5.5",
                border: `5px solid ${borderColor}`,
                backgroundColor: fillColor,
                borderRadius: "5px",
                margin: 2,
            }}
        />
    );
}

function Secret({
    secret,
    levelUnlocked,
}: {
    secret: SecretData;
    levelUnlocked: boolean;
}) {
    const [state, refresh] = useGameState();

    const accessible = levelUnlocked && secret.possible(state);

    const fillColor = secret.current
        ? accessible
            ? "white"
            : "grey"
        : "black";

    const borderColor = accessible ? "white" : "grey";

    return (
        <div
            id="secret"
            style={{
                width: "20%",
                aspectRatio: "1 / 1",
                border: `5px solid ${borderColor}`,
                borderRadius: "5px",
                backgroundColor: fillColor,
                margin: 2,
            }}
            onClick={() => {
                if (!levelUnlocked) return;
                secret.current = !secret.current;
                refresh();
            }}
        />
    );
}

function SecretPlaceholder() {
    return (
        <div
            id="nonSecret"
            style={{
                width: "20%",
                aspectRatio: "1 / 1",
                border: "5px solid black",
                borderRadius: "5px",
                backgroundColor: "black",
                margin: 2,
            }}
        />
    );
}

function Rank({ level }: { level: LevelData }) {
    const [state, refresh] = useGameState();

    let borderColor;

    if (level.unlocked) {
        if (level.rank.possible(state) == RankType.NONE) {
            borderColor = "grey";
        } else if (
            level.rank.possible(state) == RankType.PERFECT &&
            // We check for a good weapon here since every P-rank needs one
            has_good_weapon(state)
        ) {
            borderColor = "#efa700"; // The exact code from the image
        } else {
            borderColor = "white";
        }
    } else {
        borderColor = "grey";
    }

    let rank;
    switch (level.rank.current) {
        case RankType.NONE:
            rank = "/none.png";
            break;
        case RankType.PASS:
            rank = level.rank.possible(state) ? "/pass.png" : "/oob_pass.png";
            break;
        case RankType.PERFECT:
            rank = "/perfect.png";
            break;
    }

    return (
        <img
            src={rank}
            style={{
                width: "26.5%",
                border: `5px solid ${borderColor}`,
                borderRadius: "5px",
                float: "right",
                margin: "1px",
            }}
            onClick={() => {
                if (!level.unlocked) return;
                switch (level.rank.current) {
                    case RankType.NONE:
                        level.rank.current = RankType.PASS;
                        break;
                    case RankType.PASS:
                        level.rank.current = RankType.PERFECT;
                        break;
                    case RankType.PERFECT:
                        level.rank.current = RankType.NONE;
                        break;
                }
                refresh();
            }}
        />
    );
}

export default function SecretsBar({ level }: { level: LevelData }) {
    const secrets = level.secrets.map((secret, idx) => (
        <Secret secret={secret} levelUnlocked={level.unlocked} key={idx} />
    ));

    // Fill with blank values
    for (let i = 0; i < 5; i++) {
        if (!secrets[i]) {
            secrets[i] = <SecretPlaceholder key={i} />;
        }
    }

    return (
        <Flex style={{ padding: 5 }}>
            <div style={{ width: "69%" }}>
                <Flex id="secrets" style={{ width: "100%" }}>
                    {secrets}
                </Flex>
                <Challenge
                    challenge={level.challenge}
                    levelUnlocked={level.unlocked}
                ></Challenge>
            </div>
            <Rank level={level}></Rank>
        </Flex>
    );
}
