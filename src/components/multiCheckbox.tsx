type OnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

export default function MultiCheckbox({
    text,
    onClicks,
    fillColors,
    borderColors,
}: {
    text: string;
    onClicks: OnClick[];
    fillColors?: string[];
    borderColors?: string[];
}) {
    if (fillColors === undefined)
        fillColors = Array(onClicks.length).fill("black");

    if (borderColors === undefined)
        borderColors = Array(onClicks.length).fill("white");

    const boxes = onClicks.map((onClick, index) => (
        <div
            key={index}
            style={{
                minWidth: "22px",
                aspectRatio: "1 / 1",
                border: `3px solid ${borderColors?.[index]}`,
                borderRadius: "5px",
                backgroundColor: fillColors?.[index],
                display: "inline-block",
                marginRight: 10,
            }}
            onClick={onClick}
        />
    ));

    return (
        <div id="checkbox" style={{ paddingTop: 10 }}>
            {boxes}

            <text
                style={{
                    color: "white",
                    fontSize: 18,
                    position: "absolute",

                    marginTop: 3,
                }}
            >
                {text}
            </text>
        </div>
    );
}
