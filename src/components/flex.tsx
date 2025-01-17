type Props = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    direction?: "row" | "row-reverse" | "column" | "column-reverse";
};

export default function Flex({
    direction = "row",
    children,
    style = {},
    ...props
}: Props) {
    const newStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: direction,
        ...style,
    };

    return (
        <div id="flex" style={newStyle} {...props}>
            {children}
        </div>
    );
}
