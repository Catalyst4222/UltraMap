import { useGameState, useRefresh } from "../../hooks";
import { Arsenal, WeaponLayout } from "../../types";
import Card from "../card";
import Checkbox from "../checkbox";
import Divider from "../divider";
import Flex from "../flex";

function WeaponSelectWithPrimaries({
    variant,
    arsenal,
}: {
    variant: WeaponLayout["variants"][number];
    arsenal: Arsenal;
}) {
    const refresh = useRefresh();

    return (
        <div style={{ paddingLeft: 15 }}>
            <Checkbox
                text={variant.name}
                fillColor={
                    arsenal.primaries[variant.target] ? "white" : "black"
                }
                onClick={() => {
                    arsenal.primaries[variant.target] =
                        !arsenal.primaries[variant.target];
                    refresh();
                }}
            />
        </div>
    );
}

function WeaponSelectWithSecondaries({
    variant,
    arsenal,
}: {
    variant: WeaponLayout["variants"][number];
    arsenal: Arsenal;
}) {
    const refresh = useRefresh();

    return (
        <div style={{ padding: 15 }}>
            <text style={{ fontSize: 18 }}>{variant.name}</text>
            <Checkbox
                text={"Primary Fire"}
                fillColor={
                    arsenal.primaries[variant.target] ? "white" : "black"
                }
                onClick={() => {
                    arsenal.primaries[variant.target] =
                        !arsenal.primaries[variant.target];
                    refresh();
                }}
            />
            {variant.target in arsenal.secondaries && (
                <Checkbox
                    text="Secondary Fire"
                    fillColor={
                        arsenal.secondaries[variant.target] ? "white" : "black"
                    }
                    onClick={() => {
                        // @ts-expect-error TypeScript should recognize variant.target has to be a key for Secondaries
                        arsenal.secondaries[variant.target] =
                            !arsenal.secondaries[variant.target];
                        refresh();
                    }}
                />
            )}
        </div>
    );
}

function Alternate({
    alternate,
    arsenal,
}: {
    alternate?: WeaponLayout["alternate"];
    arsenal: Arsenal;
}) {
    if (!alternate) return <></>;

    const refresh = useRefresh();

    const target = arsenal.alternates[alternate.target];

    return (
        <>
            <Divider />
            <div style={{ padding: 15 }}>
                <text style={{ fontSize: 18 }}>Alternates</text>
                <Checkbox
                    text={alternate.default}
                    fillColor={target.default ? "white" : "black"}
                    onClick={() => {
                        target.default = !target.default;
                        refresh();
                    }}
                />
                <Checkbox
                    text={alternate.alternate}
                    fillColor={target.alternate ? "white" : "black"}
                    onClick={() => {
                        target.alternate = !target.alternate;
                        refresh();
                    }}
                />
            </div>
        </>
    );
}

export default function Weapon({
    layout,
    arsenal,
}: {
    layout: WeaponLayout;
    arsenal: Arsenal;
}) {
    const [state] = useGameState();

    return (
        <Card id="weapon">
            <Flex style={{ justifyContent: "center" }}>
                <text
                    style={{
                        fontSize: 28,
                        textAlign: "center",
                    }}
                >
                    {layout.name}
                </text>
            </Flex>

            <Divider />

            {layout.variants.map((variant, index) =>
                state.settings.randomize_secondary_fire &&
                variant.target in arsenal.secondaries ? (
                        <WeaponSelectWithSecondaries
                            variant={variant}
                            arsenal={arsenal}
                            key={index}
                        />
                    ) : (
                        <WeaponSelectWithPrimaries
                            variant={variant}
                            arsenal={arsenal}
                            key={index}
                        />
                    )
            )}

            <Alternate alternate={layout.alternate} arsenal={arsenal} />
        </Card>
    );
}
