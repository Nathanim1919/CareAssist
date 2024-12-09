const EmptyPage: React.FC = () => {
  return (
    <div className="relative h-full w-full grid place-items-center">
      <div className="grid gap-5">
        <h1 className="md:text-3xl font-bold text-center">Nathanim, <span className="text-gray-500">What Can I Do For You Today?</span></h1>
        <form className="bg-black flex items-center rounded-full p-2">
          <input className="flex-1 p-2 outline-none bg-transparent" type="text" placeholder="Enter text" />
          <button type="submit" className="p-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EmptyPage;
