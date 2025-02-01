import { 
  BrowserRouter as Router,  
  Routes, 
  Route 
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import VideoPlayer from './pages/VideoPlayer';
import Shop from './pages/Shop';
import UploadVideo from './pages/UploadVideo';
import { PointsProvider } from './context/PointsContext';
import { DailyRewardsProvider } from './context/DailyRewardsContext';
import ErrorBoundary from './components/ErrorBoundary';
import Videos from './pages/Videos';
import Profile from './pages/Profile';
import AuthPopup from './components/auth/AuthPopup';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HowItWorks from './pages/HowItWorks';
import AdminProducts from './pages/AdminProducts';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <PointsProvider>
            <DailyRewardsProvider>
              <Router>
                <Layout>
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin/products" element={<AdminProducts />} />
                      <Route path="/watch" element={<VideoPlayer />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/upload" element={<UploadVideo />} />
                      <Route path="/videos" element={<Videos />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/how-it-works" element={<HowItWorks />} />
                    </Routes>
                  </ProtectedRoute>
                  <AuthPopup />
                </Layout>
              </Router>
            </DailyRewardsProvider>
          </PointsProvider>
        </AuthProvider>
      </ErrorBoundary>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;