const axios = require("axios").default;
const fs = require("fs");
const util = require("util");
require("dotenv").config();

const stream = require("stream");
const promisify = require("util").promisify;
const finished = promisify(stream.finished);

async function downloadFile(outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);
  async function getPageOfResults(offsetValue) {
    const response = await axios({
      url: `${process.env.AIRTABLE_URL}`,
      method: "GET",
      params: {
        view: "Grid view",
        offset: offsetValue ? offsetValue : "",
      },
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });
    return response.data;
  }

  async function getAllResults() {
    let records = {
      words: [],
    };
    let getPages = true;
    let offset = "";
    let totalPages = 0;

    console.log("== Start Gathering Words");
    while (getPages == true) {
      totalPages++;
      console.log(`-- adding page: ${totalPages}`);
      let newResults = await getPageOfResults(offset);
      newResults.offset ? (offset = newResults.offset) : (getPages = false);
      records.words = records.words.concat(newResults.records);
    }
    console.log(`== Finish Gathering Words, Total Pages ${totalPages}`);
    return records;
  }

  const data = await getAllResults().then((response) => {
    // console.log(response);
    fs.writeFileSync(
      outputLocationPath,
      JSON.stringify(response, null, 2),
      "utf-8"
    );
    return finished(writer); //this is a Promise
  });

  return;
}

downloadFile("src/content/words/words.json");
