import "./App.css";
import FeaturedPlayList from "./components/FeaturedPlayList";
import LocalPlayList from "./components/LocalPlayList";

function App() {
  return (
    <div className="App">
      <div className="flexbox">
        <FeaturedPlayList />
        <LocalPlayList />
      </div>
    </div>
  );
}

export default App;
