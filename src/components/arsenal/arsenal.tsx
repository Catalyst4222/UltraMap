import arsenalLayout from "../../data/arsenal_layout";
import type { Arsenal } from "../../types";
import Arms from "./arms";
import Movement from "./movement";
import Weapon from "./weapon";

export default function Arsenal({ arsenal }: { arsenal: Arsenal }) {
    const weapons = arsenalLayout.weapons.map((layout, index) => (
        <Weapon layout={layout} arsenal={arsenal} key={index} />
    ));

    const arms = <Arms arsenal={arsenal} layouts={arsenalLayout.arms} />;
    const movement = <Movement movement={arsenal.movement} />;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            }}
        >
            {weapons}
            {arms}
            {movement}
        </div>
    );
}
