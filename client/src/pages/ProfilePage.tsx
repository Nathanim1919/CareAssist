const ProfilePage: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/3">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 rounded-full bg-gray-100"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-4 rounded-full bg-gray-100"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 rounded-full bg-gray-100"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-4 rounded-full bg-gray-100"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-4 rounded-full"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
