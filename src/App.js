import "./App.css";
import Header from "./Component/Common/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Footer from "./Component/Common/Footer/Footer";
import Login from "./Component/Login/Login";
import VocabularyTopic from "./Component/Vocabulary/VocabularyTopic";
import VocabularyByTopic from "./Component/Vocabulary/VocabularyByTopic";
import Courses from "./Component/Courses/Courses";
import CourseLessons from "./Component/Courses/CourseLessons";
import Lesson from "./Component/Courses/Lessons/Lesson";
import TestIndex from "./Component/Test/TestIndex";
import TestList from "./Component/Test/TestList";
import TestMain from "./Component/Test/TestMain/TestMain";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./Component/Common/Layout/UserLayout";
import ProfessorLayout from "./Component/Common/Layout/ProfessorLayout";
import ProfessorHome from "./Component/ProfessorComponent/Common/ProfessorHome";
import ProfessorTestManage from "./Component/ProfessorComponent/TestManage/ProfessorTestManage";
import ProfessorVocabularyTopic from "./Component/ProfessorComponent/VocabularyManage/ProfessorVocabularyTopic";
import ProfessorVocabulary from "./Component/ProfessorComponent/VocabularyManage/ProfessorVocabulary";
import ForgotPassword from "./Component/Login/ForgotPassword";
import CourseManageIndex from "./Component/ProfessorComponent/CourseManage/CourseManageIndex";
import LessonManage from "./Component/ProfessorComponent/CourseManage/LessonManage";
import AddLesson from "./Component/ProfessorComponent/CourseManage/AddLesson";
import UpdateLesson from "./Component/ProfessorComponent/CourseManage/UpdateLesson";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <UserLayout>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="/practice-vocabulary"
              element={<VocabularyTopic />}
            />
            <Route
              exact
              path="/vocabulary-by-topic/:id"
              element={<VocabularyByTopic />}
            />
            <Route exact path="/courses" element={<Courses />} />
            <Route
              exact
              path="/course-lessons/:id"
              element={<CourseLessons />}
            />
            <Route exact path="/lesson/:id" element={<Lesson />} />
            <Route exact path="/test" element={<TestIndex />} />
            <Route exact path="/test/type/:id" element={<TestList />} />
            <Route exact path="/test/:id" element={<TestMain />} />
          </Routes>
          <Footer />
        </UserLayout>
        <ProfessorLayout>
          <Routes>
            <Route exact path="/" element={<ProfessorHome />}>
              <Route
                exact
                path="professor/test"
                element={<ProfessorTestManage />}
              />
              <Route
                exact
                path="professor/vocabulary"
                element={<ProfessorVocabularyTopic />}
              />
              <Route
                exact
                path="professor/vocabulary/:id"
                element={<ProfessorVocabulary />}
              />
              <Route
                exact
                path="professor/course"
                element={<CourseManageIndex />}
              />
              <Route
                exact
                path="professor/course/:id"
                element={<LessonManage />}
              />
              <Route
                exact
                path="professor/course/lesson/:id"
                element={<UpdateLesson />}
              />
              <Route
                exact
                path="professor/course/lesson/add/:id"
                element={<AddLesson />}
              />
            </Route>
          </Routes>
        </ProfessorLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
