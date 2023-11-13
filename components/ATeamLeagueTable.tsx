import Link from "next/link";
import FormButton from "./FormButton";
import { getATeamTable } from "@/helper/GetTable";
import { getForm } from "@/helper/GetForm";

const LeagueTable = async () => {
  let TableResults = await getATeamTable();
  let TableResultsArray = TableResults.toArray();
  return (
    <div className="lg:px-8 md:w-2/3 md:mx-auto p-2">
      <div className="mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 md:pr-3  px-2 text-sm font-semibold text-gray-900 sm:pl-6 border-r border-t-0  border-b-0 border-gray-600"
              >
                Pos.
              </th>
              <th
                scope="col"
                className="md:px-3 py-3.5  text-sm font-semibold text-gray-900 lg:table-cell border-r border-gray-600"
              >
                Team
              </th>
              <th
                scope="col"
                className=" md:px-3 py-3.5   px-2 text-sm font-semibold text-gray-900 lg:table-cell border-r border-gray-600"
              >
                P
              </th>
              <th
                scope="col"
                className="md:px-3 py-3.5  px-2  text-sm font-semibold text-gray-900 lg:table-cell border-r border-gray-600"
              >
                W
              </th>
              <th
                scope="col"
                className="md:px-3  px-2 py-3.5  text-sm font-semibold text-gray-900 border-r border-gray-600"
              >
                D
              </th>
              <th
                scope="col"
                className="md:px-3 px-2 py-3.5  text-sm font-semibold text-gray-900 border-r border-gray-600"
              >
                L
              </th>
              <th
                scope="col"
                className="px-3 py-3.5  text-sm font-semibold text-gray-900 border-r border-gray-600 hidden md:table-cell"
              >
                For
              </th>
              <th
                scope="col"
                className="px-3 py-3.5  text-sm font-semibold text-gray-900 border-r border-gray-600  hidden md:table-cell "
              >
                Against
              </th>
              <th
                scope="col"
                className="px-3 py-3.5  text-sm font-semibold text-gray-900 border-r border-gray-600  hidden md:table-cell"
              >
                D
              </th>
              <th
                scope="col"
                className=" px-2 md:px-3 py-3.5  text-sm font-semibold text-gray-900 border-r border-gray-600"
              >
                PTs
              </th>

              <th
                scope="col"
                className="px-3 py-3.5  text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                <span className="">Form</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {TableResultsArray.map(async (team, teamIdx) => {
              let Form;
              if (team.teamLink) {
                Form = await getForm(team.teamLink, team.team);
              }
              console.log(Form);
              return (
                <tr
                  key={team.team + team.played + team.points}
                  className={`${
                    teamIdx % 2 == 0 ? "bg-blue-100" : "bg-blue-200"
                  } `}
                >
                  <td className="border-r border-gray-600">
                    <div className="text-gray-900">{teamIdx + 1}</div>
                  </td>
                  <td className="border-r border-gray-600">
                    <a
                      href={`https://ecflms.org.uk${team.teamLink}`}
                      target="_blank"
                    >
                      {team.team}
                    </a>
                  </td>
                  <td className="border-r border-gray-600">{team.played}</td>
                  <td className="border-r border-gray-600">{team.wins}</td>
                  <td className="border-r border-gray-600">
                    <div className="">{team.draws}</div>
                  </td>
                  <td className="border-r border-gray-600">
                    <div className="">{team.losses}</div>
                  </td>
                  <td className="border-r border-gray-600 hidden md:table-cell">
                    <div className="">{team.for}</div>
                  </td>
                  <td className="border-r border-gray-600 hidden md:table-cell">
                    <div className="">{team.against}</div>
                  </td>
                  <td className="border-r border-gray-600 hidden md:table-cell">
                    <div className="">{team.for - team.against}</div>
                  </td>
                  <td className="border-r border-gray-600">
                    <div className="">{team.points}</div>
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="flex gap-3 pl-2">
                      {Form.map((id, result) => {
                        console.log(result);
                        return (
                          <Link
                            href={`https://ecflms.org.uk${result.gameLink}`}
                            target="_blank"
                            key={result.link + result.date + result.oponent}
                          >
                            <FormButton
                              result={result.wld}
                              key={result.link + result.date + result.oponent}
                              date={result.date}
                              oponent={result.oponent}
                              boards={result.boards}
                              link={result.link}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-left text-sm hidden md:flex">
        <span>P=Played</span>
        <span className="pl-2">W=Wins</span>
        <span className="pl-2">D=Draws</span>
        <span className="pl-2">L=Losses</span>
        <span className="pl-2">For=Match Score For</span>
        <span className="pl-2">Against=Match Score Against</span>
        <span className="pl-2">D=Points Difference</span>
        <span className="pl-2">Pts=League Points</span>
      </p>
    </div>
  );
};

export default LeagueTable;
