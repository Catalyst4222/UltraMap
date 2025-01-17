type OnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

export default function Checkbox({
    text,
    onClick,
    fillColor = "black",
    borderColor = "white",
    style = {},
}: {
    text: string;
    onClick: OnClick;
    fillColor?: string;
    borderColor?: string;
    style?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >["style"];
}) {
    return (
        <div
            id="checkbox"
            style={{ paddingLeft: 15, paddingTop: 10, ...style }}
        >
            <div
                style={{
                    minWidth: "22px",
                    aspectRatio: "1 / 1",
                    border: `3px solid ${borderColor}`,
                    borderRadius: "5px",
                    backgroundColor: fillColor,
                    display: "inline-block",
                }}
                onClick={onClick}
            />
            <text
                style={{
                    color: "white",
                    fontSize: 18,
                    position: "absolute",
                    marginLeft: 10,
                    marginTop: 3,
                }}
            >
                {text}
            </text>
        </div>
    );
}
