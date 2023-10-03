import { Route, Routes } from 'react-router-dom';
import MainCore from './Pages/Main/MainCore';

import { CityProvider } from './Context/CityContext';
import { CategoryProvider } from './Context/CategoryContext';
import SelectCity from './Pages/SelectCity/SelectCity';
import NotFoundPage from './Pages/404/NotFoundPage';

function App() {

  return (<>
    <CityProvider>
      <CategoryProvider>
        <Routes>
          <Route>
            <Route path='/s/:city/:catParam?' element={<MainCore />} />
            <Route path='/v/:title/:code' element={<h1>Single PAge</h1>} />
            <Route path='/' element={<SelectCity />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CategoryProvider>
    </CityProvider>
  </>
  );
}

export default App;
