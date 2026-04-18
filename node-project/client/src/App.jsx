import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import MyCourses from './pages/MyCourses';
import ManageCourse from './pages/ManageCourse';
import CoursePlayer from './pages/CoursePlayer';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          <Route element={<ProtectedRoute allowedRoles={['Instructor']} />}>
            <Route path="/instructor/courses" element={<MyCourses />} />
            <Route path="/dashboard/courses/:id" element={<ManageCourse />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
          </Route>
        </Route>
        
        {/* Fullscreen Player Layout Route */}
        <Route path="/courses/:id/learn" element={<CoursePlayer />} />
        <Route path="/courses/:id/learn/:lessonId" element={<CoursePlayer />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;