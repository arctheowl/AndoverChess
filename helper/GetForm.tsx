import axios from "axios";
import { load } from "cheerio";
import CleanPoints from "./CleanPoint";

export async function getForm(teamLink, team) {
  const { data } = await axios.get(
    `https://ecflms.org.uk/${teamLink}/fixtures`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const $ = load(data);
  const finaldata = $("tbody")
    .find("tr")
    .map((i, el) => {
      const item = $(el).find("td");
      return {
        team: $(item[0]).text(),
        result: $(item[1]).text(),
        oponent: $(item[2]).text(),
        date: $(item[3]).text(),
        time: $(item[4]).text(),
        homePoints: CleanPoints({ points: $(item[1]).text().split("-")[0] }),
        awayPoints: CleanPoints({ points: $(item[1]).text().split("-")[1] }),
        teamLink: $(item[0]).find("a").attr("href"),
        gameLink: $(item[1]).find("a").attr("href"),
        wld: "",
      };
    });

  let Form = finaldata.filter((i, result) => result.result !== "0 - 0");

  let FinalForm = Form.map((i, match) => {
    if (match.awayPoints === match.homePoints) {
      match.wld = "D";
    } else if (
      (match.team === team && match.homePoints > match.awayPoints) ||
      (match.oponent === team && match.awayPoints > match.homePoints)
    ) {
      match.wld = "W";
    } else {
      match.wld = "L";
    }
    return match;
  });

  return FinalForm;
}
