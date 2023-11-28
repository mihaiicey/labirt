import backgroundHero from '../../../public/hero1.jpeg'
export default function Home() {
  return (
    <section
    style={{ backgroundImage: `url(${backgroundHero})` }} className=' bgOverlay relative'>
    <div
      className="mx-auto max-w-screen-xl px-4 py-28 lg:flex lg:h-[90vh] lg:items-center relative"
    >
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl text-white">
          <strong className="font-bold text-red-600  sm:block">
            Tie foame sau pofta de o bere?
          </strong>
            Dar nu ai gasit un local liber?
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed text-white">
        Rezerva o masa la restaurantul tau preferat, simplu si rapid.
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="/get-started"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  </section>
  );
}
