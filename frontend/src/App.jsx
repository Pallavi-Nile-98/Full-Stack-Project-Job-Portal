
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PostApplication from './pages/PostApplication';
import Register from './pages/Register';
import NotFound from './pages/NotFound'
const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/post/application/:jobId" element={<PostApplication/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
