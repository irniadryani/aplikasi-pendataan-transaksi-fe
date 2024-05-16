import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
  } from "react-router-dom";
  
  import Dashboard from "../pages/index";
  import { SavedPokemon } from '../pages/savedPokemon';

  export const Router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route index element={<Dashboard />} />
          <Route path="/collection" element={<SavedPokemon />} />
        </Route>
      </>
    )
  );
  export default Router;
  