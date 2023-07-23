import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/pages/Dashboard";
import UploadFiles from './components/addepisode/UploadManyFile';
import UploadFile from './components/addcomic/UploadOneFile';
import Navbar from './components/navbar/navbar';
import ComicManager from './components/comicManager/comicManager';
import Header from './components/pages/Header';
import DetailComic from './components/pages/DetailComic';

function App() {
  
  return (
    <>
      <Routes>
        <Route path={"/mainpage"} element={<Dashboard />} />
        <Route path={'/addEpisode/:id'} element={<UploadFiles />} />
        <Route path={'/addComic'} element={<UploadFile />} />
        <Route path={'/home'} element={<Header />} />
        <Route path={'/'} element={<Header />} />
        <Route path={'/comicManager'} element={<ComicManager />} />
        <Route path={'/detailComic/:id'} element={<DetailComic />} />
      </Routes>
    </>
  );
}

export default App;
