import Menu from "./components/menu";
import { state } from "./data";

function App() {
    return (
        <div className="App">
            <Menu state={state} />
        </div>
    );
}

export default App;
