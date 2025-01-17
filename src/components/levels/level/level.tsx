import { useGameState } from "../../../hooks";
import { LevelData } from "../../../types";
import Bonuses from "./bonuses";
import Divider from "../../divider";
import LevelIcon from "./levelIcon";
import SecretsBar from "./secretsBar";
import Flex from "../../flex";
import Card from "../../card";

export default function Level({ level }: { level: LevelData }) {
    const [, refresh] = useGameState();

    return (
        <Card id="level">
            <Flex style={{ justifyContent: "center" }}>
                <text
                    style={{
                        fontSize: 18,
                        textAlign: "center",
                    }}
                >
                    {level.name}
                </text>
            </Flex>

            <Divider />

            <LevelIcon level={level} refresh={refresh} />
            <SecretsBar level={level} />

            <Divider />

            <Bonuses level={level} />
        </Card>
    );
}
