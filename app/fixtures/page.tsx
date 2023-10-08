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
  { date: "Wed 11th Oct 2023", opponent: "Basingstoke C", Location: "Away" },
  { date: "Tue 24th Oct 2023", opponent: "Chandlers Ford C", Location: "Home" },
  { date: "Wed 1st Nov 2023", opponent: "Winchester C", Location: "Away" },
  { date: "Tue 7th Nov 2023", opponent: "Fareham C", Location: "Home" },
  {
    date: "Thu 23rd Nov 2023",
    opponent: "Southampton University C",
    Location: "Away",
  },
  { date: "	Tue 9th Jan 2024", opponent: "Basingstoke C", Location: "Home" },
  { date: "Tue 23rd Jan 2024", opponent: "Fareham C", Location: "Away" },
  {
    date: "Tue 20th Feb 2024",
    opponent: "Southampton University C",
    Location: "Home",
  },
  { date: "Tue 12th Mar 2024", opponent: "Winchester C", Location: "Home" },
  { date: "Tue 26th Mar 2024", opponent: "Chandlers Ford C", Location: "Away" },
];

const FutureFixtures: React.FC = ({ team }: any) => {
  console.log(team);

  return (
    <div className="text-sm md:text-base p-2">
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
                  <td className="md:px-10">{fixture.opponent}</td>
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
    <div className="bg-slate-200 text-black text-lg text-center  h-screen lg:overflow-hidden">
      <h1 className="text-center text-2xl pt-12">Fixtures</h1>
      <select
        className="flex mx-auto rounded-md"
        onChange={() => onTeamChange()}
      >
        <option>A Team</option>
        <option>B Team</option>
      </select>
      <LeagueTable teams={teams} div={team === "A Team" ? 2 : 4} />
      <div className="md:flex md:justify-around md:pt-12">
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
    played: 1,
    wins: 1,
    draws: 0,
    losses: 0,
    for: 4,
    against: 1,
    points: 2,
    form: [
      {
        result: "W",
        date: "4-10-2023",
        oponent: "Andover A",
        link: "https://ecflms.org.uk/lms/node/192718",
        boards: [1, 0.5, 1, 1, 0.5],
      },
    ],
  },
  {
    id: 3,
    position: "2",
    name: "Chandlers Ford A",
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
        date: "3-10-2023",
        oponent: "Winchester A",
        link: "https://ecflms.org.uk/lms/node/192717",
        boards: [1, 0.5, 1, 0.5, 0],
      },
    ],
  },
  {
    id: 4,
    position: "3",
    name: "Winchester A",
    played: 4,
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
  {
    id: 1,
    position: "4",
    name: "Andover A",
    played: 1,
    wins: 0,
    draws: 0,
    losses: 1,
    for: 1,
    against: 4,
    points: 0,
    form: [
      {
        result: "L",
        date: "4-10-2023",
        oponent: "Hamble A",
        link: "https://ecflms.org.uk/lms/node/192718",
        boards: [0, 0.5, 0, 0, 0.5],
      },
    ],
  },

  {
    id: 1,
    position: "5",
    name: "Fareham B",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    for: 0,
    against: 0,
    points: 0,
    form: [],
  },
  {
    id: 1,
    position: "6",
    name: "Southampton B",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    for: 0,
    against: 0,
    points: 0,
    form: [],
  },
];

const BTeams = [
  {
    id: 2,
    position: "1",
    name: "Fareham C",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    for: 0,
    against: 0,
    points: 0,
    form: [],
  },
  {
    id: 3,
    position: "2",
    name: "Southampton Univesity C",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    for: 0,
    against: 0,
    points: 0,
    form: [],
  },
  {
    id: 4,
    position: "3",
    name: "Andover B",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    for: 0,
    against: 0,
    points: 0,
    form: [],
  },
  {
    id: 1,
    position: "4",
    name: "Basingstoke C",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    for: 0,
    against: 0,
    points: 0,
    form: [],
  },

  {
    id: 1,
    position: "5",
    name: "Winchester C",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    for: 0,
    against: 0,
    points: 0,
    form: [],
  },
  {
    id: 1,
    position: "6",
    name: "Chandlers Ford C",
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    for: 0,
    against: 0,
    points: 0,
    form: [],
  },
];
