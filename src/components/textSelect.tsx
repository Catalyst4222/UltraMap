import Flex from "./flex";
import { Select, SelectOption } from "./select";

export default function TextSelect<T>({
    text,
    options,
    defaultValue,
    onChange,
}: {
    text: string;
    options: readonly { label: string; value: T }[];
    defaultValue?: T;
    onChange: (
        newValue: { label: JSX.Element; value: T; isDefault?: boolean } | null
    ) => void;
}) {
    return (
        <Flex style={{ alignItems: "center", padding: 5 }}>
            <div style={{ flexGrow: 1, alignItems: "center" }}>
                <text style={{ alignContent: "center" }}>{text}</text>
            </div>
            <div>
                <Select<T> onChange={onChange} defaultValue={defaultValue}>
                    {options.map((option, index) => (
                        <SelectOption
                            label={option.label}
                            value={option.value}
                            key={index}
                        />
                    ))}
                </Select>
            </div>
        </Flex>
    );
}
