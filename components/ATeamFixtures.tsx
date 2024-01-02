import { useEffect, useState } from "react";

export function TeamFixtures({ team }) {
  const [Fixtures, setFixtures] = useState([]);
  const AFixtures = [
    {
      Home: "Andover A",
      Away: "Winchester A",
      Date: "Tue 23rd Jan 2024",
    },
    {
      Home: "Fareham B",
      Away: "Andover A",
      Date: "Tue 20th Feb 2024",
    },
    {
      Home: "Andover A",
      Away: "Chandlers Ford A",
      Date: "Tue 5th Mar 2024",
    },
    {
      Home: "Andover A",
      Away: "Souhtampton B",
      Date: "Tue 19th Mar 2024",
    },
    {
      Home: "Andover A",
      Away: "Hamble A",
      Date: "Tue 16th Apr 2024",
    },
  ];

  const BFixtures = [
    {
      Home: "Andover B",
      Away: "Basinstoke C",
      Date: "Tue 9th Jan 2024",
    },
    {
      Home: "Fareham C",
      Away: "Andover B",
      Date: "Tue 23rd Jan 2024",
    },
    {
      Home: "Andover A",
      Away: "Southampton Uni C",
      Date: "Tue 20th Feb 2024",
    },
    {
      Home: "Andover A",
      Away: "Winchester C",
      Date: "Tue 12th Mar 2024",
    },
    {
      Home: "Chandlers Ford C",
      Away: "Andover B",
      Date: "Tue 26th Mar 2024",
    },
  ];

  useEffect(() => {
    if (team === "A Team") {
      setFixtures(AFixtures);
    }
    if (team === "B Team") {
      setFixtures(BFixtures);
    }
  });

  return (
    <div className="mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 md:pr-3  px-2 text-sm font-semibold text-gray-900 sm:pl-6 border-r border-t-0  border-b-0 border-gray-600"
            >
              Home
            </th>
            <th
              scope="col"
              className="md:px-3 py-3.5  text-sm font-semibold text-gray-900 lg:table-cell border-r border-gray-600"
            >
              Away
            </th>
            <th
              scope="col"
              className=" md:px-3 py-3.5   px-2 text-sm font-semibold text-gray-900 lg:table-cell border-r border-gray-600"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {Fixtures.map((team, i) => (
            <tr
              key={team?.Home + team?.Away + team?.Date}
              className={`${i % 2 == 0 ? "bg-blue-100" : "bg-blue-200"} `}
            >
              <td className="border-r border-gray-600 px-2 md:px-4">
                <div className="text-gray-900">{team.Home}</div>
              </td>
              <td className="border-r border-gray-600 px-2 md:px-4">
                {team?.Away}
              </td>
              <td className="border-r border-gray-600 px-2 md:px-4">
                {team?.Date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
