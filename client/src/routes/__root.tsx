// src/routes/__root.tsx
import { Outlet } from '@tanstack/react-router';

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
