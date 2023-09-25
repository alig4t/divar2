import { Route, Routes } from 'react-router-dom';
import MainCore from './Pages/Main/MainCore';
import './App.css';

function App() {
  console.log("App render");
  
  return (<>
    <Routes>
      <Route>
        <Route path='/s/:city/:catParam?' element={<MainCore />} />
        <Route path='/v/:title/:code' element={<h1>Single PAge</h1>} />
      </Route>
    </Routes>

  </>
  );
}

export default App;
