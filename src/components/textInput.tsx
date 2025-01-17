import Flex from "./flex";

export default function TextInput({ text }: { text: string }) {
    return (
        <Flex>
            <div style={{ flexGrow: 1 }}>
                <text>{text}</text>
            </div>
            <div>
                <text style={{}}>righter side</text>
            </div>
        </Flex>
    );
}
