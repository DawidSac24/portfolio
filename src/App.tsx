import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Navigation/Header';
import { Profile } from './pages/Profile/Profile';
import { SmartframePage } from './pages/SmartFrame/SmartFramePage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/smartframe" element={<SmartframePage />} />
          
          <Route path="/mbplayer" element={<div style={{ color: '#a1a1aa', padding: '4rem', marginLeft: '150px' }}>MBPlayer coming soon...</div>} />
          <Route path="/automate" element={<div style={{ color: '#a1a1aa', padding: '4rem', marginLeft: '150px' }}>Automate v2 coming soon...</div>} />
          <Route path="/engine" element={<div style={{ color: '#a1a1aa', padding: '4rem', marginLeft: '150px' }}>3D Engine coming soon...</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;