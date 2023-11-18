import "./App.css";
import Header from "./Component/Common/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Component/Home/Home";
import Footer from "./Component/Common/Footer/Footer";
import Login from "./Component/Login/Login";
import VocabularyTopic from "./Component/Vocabulary/VocabularyTopic";
import VocabularyByTopic from "./Component/Vocabulary/VocabularyByTopic";
import Courses from "./Component/Courses/Courses";
import CourseLessons from "./Component/Courses/CourseLessons";
import Lesson from "./Component/Courses/Lessons/Lesson";

function App() {
  return <div className="App">
    <BrowserRouter>
      <Header/>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/l ogin' element={<Login/>} />
      <Route exact path='/practice-vocabulary' element={<VocabularyTopic/>} />
      <Route exact path='/vocabulary-by-topic/:id' element={<VocabularyByTopic/>} />
      <Route exact path='/courses' element={<Courses/>} />
      <Route exact path='/course-lessons/:id' element={<CourseLessons/>} />
      <Route exact path='/lesson/:id' element={<Lesson/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </div>;
}

export default App;
