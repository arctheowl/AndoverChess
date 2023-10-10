import Map from "@/components/Map";

export default function AboutPage(): JSX.Element {
  return (
    <div className="bg-slate-200 text-black text-lg text-center h-screen lg:overflow-hidden flex-col items-center justify-center">
      <h1 className="text-2xl pt-12">About Andover Chess Club</h1>
      <div className="text-lg">
        <p className="pt-5">
          We are a chess club based in Andover and part of the Southampton
          league.
        </p>
        <p>We meet every Tuesday night at 7pm to play chess and socialize.</p>
        <p>
          If you think you would be interested in playing couple of games feel
          free to just come down.
        </p>
        <br />
        <p>
          Contact Us:
          <br /> Email: scartridge1@gmail.com
          <br /> Phone: 07917897427
        </p>
      </div>
      <h2 className="text-xl pt-10">
        Come visit us at the Central Club in Andover
      </h2>
      <div className="flex justify-center pt-4 w-full h-1/2 bg-slate-200">
        <div className="md:w-4/6 h-5/6 md:h-full w-5/6">
          <Map />
        </div>
      </div>
    </div>
  );
}
