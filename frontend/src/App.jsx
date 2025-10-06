import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Resgister from './pages/Resgister';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Trainers from './pages/Trainers';

function App() {
  return (
    <AuthProvider>
            <Router>
              <Navbar/>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Resgister />} />
                    <Route path="/trainers" element={<Trainers />} />
                    
                    <Route element={<ProtectedRoute />}>
                        {/* <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/memberships" element={<div>Memberships Page</div>} /> */}
                        <Route path='/profile' element={<Profile/>}/>
                    </Route>
                </Routes>
                <Footer/>
            </Router>
        </AuthProvider>
  );
}

export default App;
