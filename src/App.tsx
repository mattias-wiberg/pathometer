import { Outlet } from 'react-router-dom';
import Navbar from './pages/components/navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className='container mt-10'>
        <Outlet />
      </div>
    </>
  );
}

export default App;