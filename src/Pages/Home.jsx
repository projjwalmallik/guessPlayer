import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <h1 className="text-4xl md:text-6xl text-white font-bold mb-8 text-center">Welcome to Your Game</h1>
      <p className="text-lg md:text-xl text-white mb-12 text-center">Join the excitement now!</p>
      <Link to="/play" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        Play Now
      </Link>
    </div>
  );
};

export default Home;
