type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export default function Card({ children, style, ...props }: DivProps) {
    return (
        <div
            style={{
                margin: 10,
                border: "3px solid white",
                borderRadius: 5,
                padding: 10,
                justifyContent: "center",
                backgroundColor: "black",
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
}
