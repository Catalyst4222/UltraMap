// A checkbox in the style of those in the ultrakill settings (box on the right).
// Ideally the original checkbox would've been a bit more independant, but
// at this point finishing is more important than changing it

import { useState } from "react";
import Checkbox from "./checkbox";
import Flex from "./flex";

export default function SettingsCheckbox<
    Setting extends { [key in Target]: boolean },
    Target extends keyof Setting,
>({
    text,
    setting,
    target,
}: {
    text: string;
    setting: Setting;
    target: Target;
}) {
    const [checked, setChecked] = useState(setting[target]);

    return (
        <Flex style={{ alignItems: "center", padding: 5 }}>
            <div style={{ flexGrow: 1, alignItems: "center" }}>
                <text style={{ alignContent: "center" }}>{text}</text>
            </div>
            <div>
                <Checkbox
                    text=""
                    fillColor={checked ? "white" : "black"}
                    onClick={() => {
                        // I really don't know why the type change is needed, it should be fine as a bool
                        setting[target] = !setting[target] as Setting[Target];
                        setChecked(setting[target]);
                    }}
                    style={{ paddingLeft: 0, paddingTop: 3 }}
                />
            </div>
        </Flex>
    );
}
