// src/App.jsx

// Step 1: Import React Router's Outlet and your layout components.
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';


// Step 2: Define the App component as a layout wrapper.
function App() {
  return (
    <div>
      <ScrollToTop /> {/* Add Here inside the main div */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;