import './App.css';
import {SortingVisualizer} from './SortingVisualizer/SortingVisualizer';


function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Sorting Visualizer</h1>
      </nav>

      {/* SortingVisualizer Component */}
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
