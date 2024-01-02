"use client";
import React, { Suspense, useState } from "react";
import { ATeamFixtures } from "./ATeamFixtures";
import { BTeamFixtures } from "./BTeamFixtures";
import ATeamLeagueTable from "./ATeamLeagueTable";
import BTeamLeagueTable from "./BTeamLeagueTable";
import { ErrorBoundary } from "react-error-boundary";

export default function FixturesPage() {
  const [team, setTeam] = useState("A Team");

  const onTeamChange = () => {
    if (team === "B Team") {
      setTeam("A Team");
    } else {
      setTeam("B Team");
    }
  };

  return (
    <div className="bg-slate-200 text-black text-lg text-center h-screen overflow-auto">
      <h1 className="text-center text-2xl pt-12">Fixtures</h1>
      <div className="md:grid md:grid-cols-3 md:w-1/2 md:mx-auto md:mt-10">
        <select
          className="rounded-md text-black text-lg text-center h-10 md:w-40 w-24 mt-5 bg-blue-300 border border-black border-rounded-md"
          onChange={() => onTeamChange()}
        >
          <option>A Team</option>
          <option>B Team</option>
        </select>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              League Table
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              The Team you have selected is the{" "}
              <strong className="font-semibold text-gray-900">{team}</strong>{" "}
              They play in Division {team === "A Team" ? 2 : 4} of the
              Southampton Chess League.
            </p>
          </div>
        </div>
      </div>
      {/* <ErrorBoundary fallback={<div></div>}> */}
      <Suspense
        fallback={
          <div role="status mx-auto">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto mt-24"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        }
      >
        {team === "A Team" ? <ATeamLeagueTable /> : <BTeamLeagueTable />}

        {/* <div className="flex justify-around md:pt-12 pt-5">
          {team === "A Team" ? <ATeamFixtures /> : <BTeamFixtures />}
        </div> */}
      </Suspense>
      {/* </ErrorBoundary> */}
    </div>
  );
}
