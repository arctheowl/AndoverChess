"use client";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  result: string;
  date: string;
  oponent: string;
  boards: number[];
  link: string;
};
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f1f5f9",
  },
}));

const FormButton = ({ result, date, oponent, boards, link }: Props) => {
  let backgroundColor = "bg-gray-500";
  switch (result) {
    case "W":
      backgroundColor = "bg-green-500";
      break;
    case "L":
      backgroundColor = "bg-red-500";
      break;
    default:
      backgroundColor = "bg-gray-500";
      break;
  }
  return (
    <HtmlTooltip
      title={
        <div className="w-64 rounded-lg flex-col justify-around text-center text-lg text-black ">
          <Typography color="inherit">Result Vs {oponent}</Typography>
          <p>{date}</p>
          <table className="p-10 text-center w-full">
            <thead>
              <tr className="border-2 border-slate-900">
                <th className="border-2 border-slate-900 p-2">Board</th>
                <th className="border-2 border-slate-900 p-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {boards?.map((board, id) => {
                return (
                  <tr className="border-2 border-slate-900" key={board + id}>
                    <td className="border-2 border-slate-900">{id + 1}</td>
                    <td>{board}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {link ? (
            <span>
              <Link
                target="_blank"
                href={link}
                className="text-blue-500 text-lg"
              >
                Details...
              </Link>
            </span>
          ) : null}
        </div>
      }
    >
      <div
        className={`text-white ${backgroundColor} p-2 w-12 rounded-md hover:cursor-pointer`}
      >
        <span>{result}</span>
      </div>
    </HtmlTooltip>
  );
};
export default FormButton;
