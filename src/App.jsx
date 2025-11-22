// src/App.jsx

// Step 1: Import React Router's Outlet and your layout components.
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Step 2: Define the App component as a layout wrapper.
function App() {
  return (
    <div>
      <Navbar />
      <main>
        {/* 
          This is the magic part! 
          React Router will render the correct page component here 
          (HomePage, TextilePage, etc.) based on the URL.
        */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Step 3: Export the App component.
export default App;