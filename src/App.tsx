
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import { Toaster } from 'sonner';

// Pages
import Home from './pages/Home';
import ShowList from './pages/ShowList';
import ShowDetail from './pages/ShowDetail';
import VenueList from './pages/VenueList';
import VenueDetail from './pages/VenueDetail';
import TravelSurroundings from './pages/TravelSurroundings';
import ItineraryGuide from './pages/ItineraryGuide';
import ItineraryDetail from './pages/ItineraryDetail';
import SocialSquare from './pages/SocialSquare';
import FindBuddies from './pages/FindBuddies';
import TicketMarket from './pages/TicketMarket';
import Profile from './pages/Profile';
import { 
  MyOrders, 
  MyReminders, 
  MyItineraries, 
  MyTickets,
  MyFavorites,
  MyFollowing,
  MyReviews,
  AccountSecurity,
  HelpFeedback
} from './pages/ProfileSubPages';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminShows from './pages/AdminShows';
import AdminVenues from './pages/AdminVenues';
import AdminPosts from './pages/AdminPosts';
import AdminUsers from './pages/AdminUsers';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAppContext();
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Toaster position="top-center" richColors />
      <Routes>
          {/* Public & User Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<ShowList />} />
            <Route path="/show-detail" element={<ShowDetail />} />
            <Route path="/venues" element={<VenueList />} />
            <Route path="/venue-detail" element={<VenueDetail />} />
            <Route path="/travel" element={<TravelSurroundings />} />
            <Route path="/itinerary" element={<ItineraryGuide />} />
            <Route path="/itinerary-detail" element={<ItineraryDetail />} />
            <Route path="/social" element={<SocialSquare />} />
            <Route path="/social/buddies" element={<FindBuddies />} />
            <Route path="/social/tickets" element={<TicketMarket />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Profile Sub Pages */}
            <Route path="/profile/orders" element={<MyOrders />} />
            <Route path="/profile/reminders" element={<MyReminders />} />
            <Route path="/profile/itineraries" element={<MyItineraries />} />
            <Route path="/profile/tickets" element={<MyTickets />} />
            <Route path="/profile/favorites" element={<MyFavorites />} />
            <Route path="/profile/following" element={<MyFollowing />} />
            <Route path="/profile/reviews" element={<MyReviews />} />
            <Route path="/profile/security" element={<AccountSecurity />} />
            <Route path="/profile/help" element={<HelpFeedback />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="shows" element={<AdminShows />} />
            <Route path="venues" element={<AdminVenues />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
    </AppProvider>
  );
};

export default App;
