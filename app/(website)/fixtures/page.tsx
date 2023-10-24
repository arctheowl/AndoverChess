"use client";
import LeagueTable from "@/components/LeagueTable";
import React from "react";

interface Fixture {
  date: string;
  opponent: string;
  Location: string;
}

const ATeamFutureFixtures: Fixture[] = [
  { date: "Tue 17th Oct 2023", opponent: "Chandlers Ford A", Location: "Away" },
  { date: "Tue 21st Nov 2023", opponent: "Southampton B", Location: "Away" },
  { date: "Wed 29th Nov 2023", opponent: "Winchester A", Location: "Away" },
  { date: "Tue 5th Dec 2023", opponent: "Fareham B", Location: "Home" },
  { date: "Tue 23rd Jan 2024", opponent: "Winchester A", Location: "Home" },
  { date: "Tue 20th Feb 2024", opponent: "Fareham B", Location: "Away" },
  { date: "Tue 5th Mar 2024", opponent: "Chandlers Ford A", Location: "Home" },
  { date: "Tue 19th Mar 2024", opponent: "Southampton B", Location: "Home" },
  { date: "Tue 16th Apr 2024", opponent: "Hamble A", Location: "Home" },
];

const BTeamFutureFixtures: Fixture[] = [
  { date: "Tue 24th Oct 2023", opponent: "Chandlers Ford C", Location: "Home" },
  { date: "Wed 1st Nov 2023", opponent: "Winchester C", Location: "Away" },
  { date: "Tue 7th Nov 2023", opponent: "Fareham C", Location: "Home" },
  {
    date: "Thu 23rd Nov 2023",
    opponent: "Soton Uni C",
    Location: "Away",
  },
  { date: "	Tue 9th Jan 2024", opponent: "Basingstoke C", Location: "Home" },
  { date: "Tue 23rd Jan 2024", opponent: "Fareham C", Location: "Away" },
  {
    date: "Tue 20th Feb 2024",
    opponent: "Soton Uni C",
    Location: "Home",
  },
  { date: "Tue 12th Mar 2024", opponent: "Winchester C", Location: "Home" },
  { date: "Tue 26th Mar 2024", opponent: "Chandlers Ford C", Location: "Away" },
];

const FutureFixtures = ({ team }) => {
  return (
    <div className="p-2 flex-col">
      <h2 className="md:text-2xl font-semibold">Future Fixtures</h2>
      <table className="md:mr-16">
        <thead>
          <tr>
            <th className="font-medium ">Date</th>
            <th className="font-medium">Opponent</th>
            <th className="font-medium">Location</th>
          </tr>
        </thead>
        <tbody>
          {team === "A Team"
            ? ATeamFutureFixtures.map((fixture, teamIdx) => (
                <tr
                  key={fixture.date}
                  className={`${
                    teamIdx % 2 == 0 ? "bg-blue-100" : "bg-blue-200"
                  } `}
                >
                  <td className="md:px-10">{fixture.date}</td>
                  <td className="md:px-10">{fixture.opponent}</td>
                  <td className="md:px-10">{fixture.Location}</td>
                </tr>
              ))
            : BTeamFutureFixtures.map((fixture, teamIdx) => (
                <tr
                  key={fixture.date}
                  className={`${
                    teamIdx % 2 == 0 ? "bg-blue-100" : "bg-blue-200"
                  } `}
                >
                  <td className="md:px-10">{fixture.date}</td>
                  <td className="md:px-10 px-4">{fixture.opponent}</td>
                  <td className="md:px-10">{fixture.Location}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

const FixturesPage: React.FC = () => {
  const [team, setTeam] = React.useState("A Team");
  const [teams, setTeams] = React.useState(ATeams);

  const onTeamChange = () => {
    if (teams === BTeams) {
      setTeam("A Team");
      setTeams(ATeams);
    } else {
      setTeam("B Team");
      setTeams(BTeams);
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
      <LeagueTable teams={teams} />
      <div className="flex justify-around md:pt-12 pt-5">
        <FutureFixtures team={team} />
      </div>
    </div>
  );
};

export default FixturesPage;

const ATeams = [
  {
    id: 2,
    position: "1",
    name: "Hamble A",
    played: 2,
    wins: 2,
    draws: 0,
    losses: 0,
    for: 7.5,
    against: 2.5,
    points: 4,
    form: [
      {
        result: "W",
        date: "4-10-2023",
        oponent: "Andover A",
        link: "https://ecflms.org.uk/lms/node/192718",
        boards: [1, 0.5, 1, 1, 0.5],
      },
      {
        result: "W",
        date: "18-10-2023",
        oponent: "Fareham B",
        link: "https://ecflms.org.uk/lms/node/192731",
        boards: [0.5, 1, 0.5, 0.5, 1],
      },
    ],
  },
  {
    id: 3,
    position: "2",
    name: "Chandlers Ford A",
    played: 2,
    wins: 1,
    draws: 0,
    losses: 1,
    for: 5,
    against: 5,
    points: 2,
    form: [
      {
        result: "W",
        date: "3-10-2023",
        oponent: "Winchester A",
        link: "https://ecflms.org.uk/lms/node/192717",
        boards: [1, 0.5, 1, 0.5, 0],
      },
      {
        result: "L",
        date: "17-10-2023",
        oponent: "Andover",
        link: "https://ecflms.org.uk/lms/node/192729",
        boards: [1, 0.5, 0, 0.5, 0],
      },
    ],
  },
  {
    id: 1,
    position: "4",
    name: "Andover A",
    played: 2,
    wins: 1,
    draws: 0,
    losses: 1,
    for: 4,
    against: 6,
    points: 2,
    form: [
      {
        result: "L",
        date: "4-10-2023",
        oponent: "Hamble A",
        link: "https://ecflms.org.uk/lms/node/192718",
        boards: [0, 0.5, 0, 0, 0.5],
      },
      {
        result: "W",
        date: "17-10-2023",
        oponent: "Chandlers Ford A",
        link: "https://ecflms.org.uk/lms/node/192729",
        boards: [0, 0.5, 1, 0.5, 1],
      },
    ],
  },
  {
    id: 1,
    position: "6",
    name: "Southampton B",
    played: 1,
    wins: 1,
    draws: 0,
    losses: 0,
    for: 3,
    against: 2,
    points: 2,
    form: [
      {
        result: "W",
        date: "10-10-2023",
        oponent: "Farham B",
        link: "https://ecflms.org.uk/lms/node/192722",
        boards: [1, 0, 0, 1, 1],
      },
    ],
  },

  {
    id: 1,
    position: "5",
    name: "Fareham B",
    played: 2,
    wins: 0,
    draws: 0,
    losses: 2,
    for: 3.5,
    against: 6.5,
    points: 0,
    form: [
      {
        result: "L",
        date: "10-10-2023",
        oponent: "Southampton B",
        link: "https://ecflms.org.uk/lms/node/192722",
        boards: [0, 1, 1, 0, 0],
      },
      {
        result: "L",
        date: "18-10-2023",
        oponent: "Hamble A",
        link: "https://ecflms.org.uk/lms/node/192731",
        boards: [0.5, 0, 0.5, 0.5, 0],
      },
    ],
  },

  {
    id: 4,
    position: "3",
    name: "Winchester A",
    played: 1,
    wins: 0,
    draws: 0,
    losses: 1,
    for: 2,
    against: 3,
    points: 0,
    form: [
      {
        result: "L",
        date: "3-10-2023",
        oponent: "Chandlers Ford A",
        link: "https://ecflms.org.uk/lms/node/192717",
        boards: [0, 0.5, 0, 0.5, 1],
      },
    ],
  },
];

const BTeams = [
  {
    id: 1,
    position: "1",
    name: "Chandlers Ford C",
    played: 2,
    wins: 2,
    draws: 0,
    losses: 0,
    for: 6,
    against: 2,
    points: 4,
    form: [
      {
        result: "W",
        date: "10-10-2023",
        oponent: "Winchester C",
        link: "https://ecflms.org.uk/lms/node/192724",
        boards: [0.5, 1, 1, 1],
      },
      {
        result: "W",
        date: "19-10-2023",
        oponent: "Southampton Uni C",
        link: "https://ecflms.org.uk/lms/node/192724",
        boards: [1, 1, 0, 0.5],
      },
    ],
  },
  {
    id: 5,
    position: "2",
    name: "Fareham C",
    played: 1,
    wins: 1,
    draws: 0,
    losses: 0,
    for: 3.5,
    against: 0.5,
    points: 2,
    form: [
      {
        result: "W",
        date: "10-10-2023",
        oponent: "Winchester C",
        link: "https://ecflms.org.uk/lms/node/192730",
        boards: [1, 0.5, 1, 1],
      },
    ],
  },
  {
    id: 2,
    position: "3",
    name: "Basingstoke C",
    played: 1,
    wins: 1,
    draws: 0,
    losses: 0,
    for: 2.5,
    against: 1.5,
    points: 2,
    form: [
      {
        result: "W",
        date: "11-10-2023",
        oponent: "Basingstoke C",
        link: "https://ecflms.org.uk/lms/node/192725",
        boards: [0.5, 0, 1, 1],
      },
    ],
  },
  {
    id: 6,
    position: "4",
    name: "Southampton Univesity C",
    played: 1,
    wins: 0,
    draws: 0,
    losses: 1,
    for: 1.5,
    against: 2.5,
    points: 0,
    form: [
      {
        result: "L",
        date: "10-10-2023",
        oponent: "Chandlers Ford C",
        link: "https://ecflms.org.uk/lms/node/192734",
        boards: [0, 0, 1, 0.5],
      },
    ],
  },

  {
    id: 3,
    position: "5",
    name: "Andover B",
    played: 1,
    wins: 0,
    draws: 0,
    losses: 1,
    for: 1.5,
    against: 2.5,
    points: 0,
    form: [
      {
        result: "L",
        date: "11-10-2023",
        oponent: "Basingstoke C",
        link: "https://ecflms.org.uk/lms/node/192725",
        boards: [0.5, 1, 0, 0],
      },
    ],
  },

  {
    id: 4,
    position: "6",
    name: "Winchester C",
    played: 1,
    wins: 0,
    draws: 0,
    losses: 1,
    for: 0.5,
    against: 3.5,
    points: 0,
    form: [
      {
        result: "L",
        date: "10-10-2023",
        oponent: "Chadlers Ford C",
        link: "https://ecflms.org.uk/lms/node/192724",
        boards: [0.5, 0, 0, 0],
      },
      {
        result: "L",
        date: "10-10-2023",
        oponent: "Farham C",
        link: "https://ecflms.org.uk/lms/node/192730",
        boards: [0, 0.5, 0, 0],
      },
    ],
  },
];
