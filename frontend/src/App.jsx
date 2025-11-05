import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/public_pages/LandingPage';
import Login from './pages/public_pages/Login';
import Resgister from './pages/public_pages/Resgister';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MemberProfile from './pages/member/MemberProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import AdminMembers from './pages/admin/AdminMembers';
import MembershipDisplay from './pages/public_pages/MembershipDisplay';
import AdminTrainers from './pages/admin/AdminTrainers';
import AdminClasses from './pages/admin/AdminClasses';
import AboutUs from './pages/public_pages/AboutUs';

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
                    <Route path="/membership-plans" element={<MembershipDisplay />} />
                    <Route path="/aboutus" element={<AboutUs />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path='/profile' element={<MemberProfile/>}/>
                        {/* Admin Pages */}
                        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                        <Route path='/admin/members' element={<AdminMembers/>}/>
                        <Route path="/admin/trainers" element={<AdminTrainers />} />
                        <Route path="/admin/classes" element={<AdminClasses />} />
                        
                        {/* Trainer Pages */}
                        <Route path='/trainer/dashboard' element={<TrainerDashboard/>}/>
                    </Route>


                </Routes>
                <Footer/>
            </Router>
        </AuthProvider>
  );
}

export default App;
