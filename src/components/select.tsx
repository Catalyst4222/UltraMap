import React from "react";
import { default as ReactSelect } from "react-select";

type MaybeArray<T> = T | Array<T>;
type Option<T> = { label: string; value: T };

// Placeholder for options
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SelectOption({ label, value }: Option<unknown>) {
    return <></>;
}

export function Select<T>({
    placeholder = "Select...",
    defaultValue,
    onChange,
    children,
}: {
    placeholder?: string;
    defaultValue?: T;
    onChange: Parameters<
        typeof ReactSelect<{ label: JSX.Element; value: T }>
    >[0]["onChange"];
    children?: MaybeArray<React.ReactElement<Option<T>>>;
}) {
    if (children === undefined) children = [];
    if (!Array.isArray(children)) children = [children];
    const options = children.map((child) => ({
        value: child.props.value,
        label: <text>{child.props.label}</text>,
    }));

    const defaultOption = options.find(
        (option) => option.value === defaultValue
    );

    const placeholderComponent = () => (
        <text style={{ gridArea: "1/1/2/3", color: "grey" }}>
            {placeholder}
        </text>
    );

    return (
        <ReactSelect
            options={options}
            defaultValue={defaultOption}
            onChange={onChange}
            components={{ Placeholder: placeholderComponent }}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,

                    "&:hover": { borderColor: "grey" },
                    boxShadow: "",

                    borderColor: "white",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderRadius: "5px",

                    backgroundColor: "black",
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,

                    borderColor: "white",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    backgroundColor: "black",
                }),
                option: (baseStyles) => ({
                    ...baseStyles,

                    "&:hover": { backgroundColor: "grey" },

                    borderColor: "white",
                    borderStyle: "solid",
                    borderWidth: 0.5,
                    backgroundColor: "black",
                }),
                menuList: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                }),
            }}
        />
    );
}
