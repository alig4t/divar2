import { Route, Routes } from 'react-router-dom';
import MainCore from './Pages/Main/MainCore';
import './App.css';
import { CityProvider } from './Context/CityContext';
import { CategoryProvider } from './Context/CategoryContext';

function App() {
  console.log("App render");

  return (<>
    <CityProvider>
      <CategoryProvider>
        <Routes>
          <Route>
            <Route path='/s/:city/:catParam?' element={<MainCore />} />
            <Route path='/v/:title/:code' element={<h1>Single PAge</h1>} />
          </Route>
        </Routes>
      </CategoryProvider>
    </CityProvider>
  </>
  );
}

export default App;
