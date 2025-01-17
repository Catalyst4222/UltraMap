import { LevelData, SecretLevelData, SkullType } from "../../types";

export default function Skull({
    level,
    refresh,
    index,
}: {
    level: LevelData | SecretLevelData;
    refresh: () => void;
    index: number;
}) {
    let src;
    switch (level.skulls[index]) {
        case SkullType.RED:
            src = "/red_skull.png";
            break;
        case SkullType.BLUE:
            src = "/blue_skull.png";
            break;
        case SkullType.RED_EMPTY:
        case SkullType.BLUE_EMPTY:
            src = "/blank_skull.png";
            break;
    }

    function toggleSkull(skullType: SkullType) {
        switch (skullType) {
            case SkullType.RED:
                return SkullType.RED_EMPTY;
            case SkullType.RED_EMPTY:
                return SkullType.RED;
            case SkullType.BLUE:
                return SkullType.BLUE_EMPTY;
            case SkullType.BLUE_EMPTY:
                return SkullType.BLUE;
        }
    }

    return (
        <img
            src={src}
            onClick={() => {
                level.skulls[index] = toggleSkull(level.skulls[index]);
                refresh();
            }}
            style={{
                color: "white",
                width: 75,
                margin: -5,
            }}
        />
    );
}
