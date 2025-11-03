import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/public_pages/LandingPage';
import Login from './pages/public_pages/Login';
import Resgister from './pages/public_pages/Resgister';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MemberProfile from './pages/member/MemberProfile';
import Trainers from './pages/trainer/Trainers';
import AdminDashboard from './pages/admin/AdminDashboard';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import AdminMembers from './pages/admin/AdminMembers';
import MembershipDisplay from './pages/public_pages/MembershipDisplay';

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
                    <Route path="/membership-plans" element={<MembershipDisplay />} />
                    <Route element={<ProtectedRoute />}>
                        {/* <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/memberships" element={<div>Memberships Page</div>} /> */}
                        <Route path='/profile' element={<MemberProfile/>}/>
                        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                        <Route path='/admin/members' element={<AdminMembers/>}/>
                        <Route path="/admin/trainers" element={<Trainers />} />
                        <Route path='/trainer/dashboard' element={<TrainerDashboard/>}/>
                    </Route>
                </Routes>
                <Footer/>
            </Router>
        </AuthProvider>
  );
}

export default App;
