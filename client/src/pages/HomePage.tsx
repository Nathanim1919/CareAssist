import React from 'react';
import Nabar from '../components/NavBar';
import ChatPageWithProvider from './ChatPage';


const HomePage: React.FC = () => {
  return (
    <div className='w-[80%] h-100vh pb-8 overflow-hidden mx-auto text-white bg-gray-950'>
      <Nabar/>
      <ChatPageWithProvider />
    </div>
  );
};

export default HomePage;
