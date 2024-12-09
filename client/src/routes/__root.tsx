// src/routes/__root.tsx
import { Outlet } from '@tanstack/react-router';
import Nabar from '../components/NavBar';

const Root = () => {
  return (
    <div>
       <Nabar/>
      <Outlet />
    </div>
  );
};

export default Root;