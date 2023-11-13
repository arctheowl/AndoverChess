import axios from "axios";
import { load } from "cheerio";
import CleanPoints from "./CleanPoint";

export const ATeamNames = [
  "Andover A",
  "Hamble A",
  "Chandlers Ford A",
  "Southampton B",
  "Winchester A",
  "Fareham B",
];

const BTeams = [
  "Andover B",
  "Southampton C",
  "Chandlers Ford C",
  "Basingstoke C",
  "Winchester C",
  "Fareham C",
];

export async function getADivisionFixtures() {
  const { data } = await axios.get(
    "https://ecflms.org.uk/lms/league/plain/event/140736/SCL+Div+2",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const $ = load(data);
  const finaldata = $("tr");
  let results = finaldata.map((i, el) => {
    const item = $(el).find("td");
    return {
      team: $(item[0]).text(),
      score: $(item[1]).text(),
      StrhomePoints: $(item[1]).text().split("-")[0],
      StrawayPoints: $(item[1]).text().split("-")[1],
      homePoints: CleanPoints({ points: $(item[1]).text().split("-")[0] }),
      awayPoints: CleanPoints({ points: $(item[1]).text().split("-")[1] }),
      oponent: $(item[2]).text(),
      date: $(item[3]).text(),
      gamelink: $(item[1]).find("a").attr("href"),
    };
  });

  return {
    results,
  };
}

export const getATeamResults = async () => {
  let results = await getADivisionFixtures();

  let ATeamResults = results.results.filter(
    (i, result) => result.score !== "0 - 0" && result.team !== ""
  );
  return ATeamResults;
};

export const getATeamTable = async () => {
  const { data } = await axios.get(
    "https://ecflms.org.uk/lms/league/plain/table/140736/SCL+Div+2",
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
        played: $(item[1]).text(),
        wins: $(item[2]).text(),
        draws: $(item[3]).text(),
        losses: $(item[4]).text(),
        for: CleanPoints({ points: $(item[5]).text() }),
        against: CleanPoints({ points: $(item[6]).text() }),
        points: $(item[7]).text(),
        teamLink: $(item[0]).find("a").attr("href"),
      };
    });
  return finaldata;
};

export async function getATeamFixtures() {
  let results = await getADivisionFixtures();

  let ATeamFixtures = results.results.filter(
    (i, result) =>
      (result.score === "0 - 0" && result.team === "Andover A") ||
      (result.score === "0 - 0" && result.oponent === "Andover A")
  );
  return ATeamFixtures;
}

export async function getBDivisionFixtures() {
  const { data } = await axios.get(
    "https://ecflms.org.uk/lms/league/plain/event/140736/SCL+Div+4",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const $ = load(data);
  const finaldata = $("tr");
  let results = finaldata.map((i, el) => {
    const item = $(el).find("td");
    return {
      team: $(item[0]).text(),
      score: $(item[1]).text(),
      StrhomePoints: $(item[1]).text().split("-")[0],
      StrawayPoints: $(item[1]).text().split("-")[1],
      homePoints: CleanPoints({ points: $(item[1]).text().split("-")[0] }),
      awayPoints: CleanPoints({ points: $(item[1]).text().split("-")[1] }),
      oponent: $(item[2]).text(),
      date: $(item[3]).text(),
      gamelink: $(item[1]).find("a").attr("href"),
    };
  });

  return {
    results,
  };
}
export const getBTeamResults = async () => {
  let results = await getBDivisionFixtures();

  let BTeamResults = results.results.filter(
    (i, result) => result.score !== "0 - 0" && result.team !== ""
  );
  return BTeamResults;
};

export async function getBTeamFixtures() {
  let results = await getBDivisionFixtures();

  let BTeamFixtures = results.results.filter(
    (i, result) =>
      (result.score === "0 - 0" && result.team === "Andover B") ||
      (result.score === "0 - 0" && result.oponent === "Andover B")
  );
  return BTeamFixtures;
}

export const getBTeamTable = async () => {
  const { data } = await axios.get(
    "https://ecflms.org.uk/lms/league/plain/table/140736/SCL+Div+4",
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
        played: $(item[1]).text(),
        wins: $(item[2]).text(),
        draws: $(item[3]).text(),
        losses: $(item[4]).text(),
        for: CleanPoints({ points: $(item[5]).text() }),
        against: CleanPoints({ points: $(item[6]).text() }),
        points: $(item[7]).text(),
      };
    });
  return finaldata;
};
