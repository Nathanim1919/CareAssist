import React from 'react';
import NavBar from '../components/NavBar';
import ChatPage from './ChatPage';


const HomePage: React.FC = () => {
  return (
    <div className='w-[80%] mx-auto'>
      <NavBar />
      <ChatPage />
    </div>
  );
};

export default HomePage;
