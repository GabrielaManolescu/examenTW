
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import './App.css';
// import AddCandidates from './profiles/AddCandidate'
import Home from './Components/Home';
import Shelf from './Components/Shelf';
import Shelves from './Components/Shelves';
import AddShelf from './Components/AddShelf';
import Export from './Components/Export';




function App() {

  return (
    <BrowserRouter >
      <Nav />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/shelf/:shelfId" element={<Shelf />} />
        <Route path="/shelves" element={<Shelves />} />
        <Route path="/shelves/newShelf" element={<AddShelf />} />


        <Route path="/export" element={<Export />} />


      </Routes>
    </BrowserRouter>
  );



}

export default App;
