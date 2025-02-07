import Cards from "../Components/cards/Cards";

function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[url('/BgImg.jpg')] w-[90%] h-90 sm:h-80 bg-cover bg-center md:mx-10 text-white flex flex-col gap-10 p-8">
        <div className="flex flex-col gap-2">
          <p className="text-3xl md:text-5xl font-bold">For Those</p>
          <p className="text-3xl md:text-5xl font-bold">Who Live For The Groove</p>
        </div>
        <p className="sm:w-[50%] text-center">
          At GrooveHaus, we believe music is more than just sound its an
          experience, a story, and a way of life. Our mission is to bring that
          experience to you through a carefully curated collection of vinyl
          records, CDs, and exclusive releases.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl">Start Exploring</h1>
        <div className="py-4">
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default Home;
