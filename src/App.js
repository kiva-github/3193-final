import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import SeriesSelection from './components/series-selection/SeriesSelection'
import SeriesTypes from './components/series-types/SeriesTypes'

// context
import { useAuthContext } from "./contexts/auth-context/useAuthContext";

// pages
import AccountPage from "./pages/account-page/AccountPage";
import AddCardPage from "./pages/add-card/AddCard";
import AuthPage from "./pages/auth-page/AuthPage";
import CollectionView from "./pages/my-cards-page/components/collection-view/CollectionView";
import EnterCard from './pages/add-card/components/enter-card/EnterCard'
import HomePage from "./pages/home-page/HomePage";
import ParentPage from "./pages/main-page/ParentPage";
import MyCardsPage from "./pages/my-cards-page/MyCardsPage";

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div>
      {authIsReady &&
        <BrowserRouter>
          <Routes>
            <Route path='/' element={user ? <ParentPage /> : <AuthPage />}>
              <Route path='' element={<HomePage />} />
              <Route path='account' element={<AccountPage />} />
              <Route path='add' element={<AddCardPage />}>
                <Route path='' element={<SeriesSelection />} />
                <Route path=':series' element={<SeriesTypes />} />
                <Route path=':series/:category' element={<SeriesTypes />} />
                <Route path=':series/:category/:type' element={<EnterCard />} />
              </Route>
              <Route path='my-cards' element={<MyCardsPage />}>
                <Route path='' element={<SeriesSelection />} />
                <Route path=':series' element={<SeriesTypes />} />
                <Route path=':series/:category' element={<SeriesTypes />} />
                <Route path=':series/:category/:type' element={<CollectionView />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      }
    </div>
  )
}

export default App;
