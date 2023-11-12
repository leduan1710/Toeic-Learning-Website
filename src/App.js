import "./App.css";
import Header from "./Component/Common/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Component/Home/Home";
import Footer from "./Component/Common/Footer/Footer";
import Login from "./Component/Login/Login";
import VocabularyTopic from "./Component/Vocabulary/VocabularyTopic";

function App() {
  return <div className="App">
    <BrowserRouter>
      <Header/>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/practice-vocabulary' element={<VocabularyTopic/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </div>;
}

export default App;
