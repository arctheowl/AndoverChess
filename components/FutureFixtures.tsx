import { useEffect } from "react";

const FutureFixtures = async () => {
  useEffect(() => {
    const BTeamFixtures = fetch(
      "https://ecflms.org.uk/lms/league/plain/event/140736/SCL+Div+4",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then((res) => res.json());
  }, []);
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
          {/* <Suspense fallback={<div>Loading...</div>}>
            {BTeamFixtures?.map((i, team) => (
              <tr
                key={team.team + team.oponent + team.date}
                className={`${i % 2 == 0 ? "bg-blue-100" : "bg-blue-200"} `}
              >
                <td className="border-r border-gray-600 px-4">
                  <div className="text-gray-900">{team.team}</div>
                </td>
                <td className="border-r border-gray-600 px-4">
                  {team.oponent}
                </td>
                <td className="border-r border-gray-600 px-4">{team.date}</td>
              </tr>
            ))}
          </Suspense> */}
        </tbody>
      </table>
    </div>
  );
};

export default FutureFixtures;
