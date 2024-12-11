import { Link } from "@tanstack/react-router";

export const HeroPage = () => {
    return (
        <div className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 h-screen w-screen overflow-hidden flex flex-col items-center justify-center text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-[-1]">
                {/* Gradient Circles */}
                <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-600 opacity-25 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-60 h-60 rounded-full bg-pink-400 opacity-30 blur-2xl"></div>
            </div>

            {/* Navigation */}
            <nav className="mb-8">
                <ul className="flex items-center gap-8">
                    <li>
                        <Link
                            to="/"
                            className="text-lg font-medium hover:underline transition duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="text-lg font-medium hover:underline transition duration-300"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/register"
                            className="text-lg font-medium hover:underline transition duration-300"
                        >
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Hero Content */}
            <div className="text-center max-w-2xl px-6">
                <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500 animate-fade-in">
                    Welcome to ChatBot Hero
                </h1>
                <p className="text-lg font-light mb-8 animate-slide-up">
                    Your AI assistant for smarter, faster, and seamless conversations.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/chats"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-lg font-medium rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
                    >
                        Start Chatting
                    </Link>
                    <Link
                        to="/learn-more"
                        className="px-6 py-3 bg-white bg-opacity-10 backdrop-blur-md text-lg font-medium rounded-lg shadow-md hover:bg-opacity-20 transition duration-300"
                    >
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Animated Decorative Elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-tr from-pink-400 to-indigo-400 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-10 right-20 w-24 h-24 bg-gradient-to-bl from-indigo-400 to-purple-500 rounded-full animate-pulse"></div>
        </div>
    );
};
