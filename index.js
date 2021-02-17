const axios = require("axios");
const cron = require("node-cron");
const { Parser } = require("json2csv");
const { sendMail } = require("./send-email");


fs = require("fs");

axios.get("https://api.punkapi.com/v2/beers", {}).then(function (response) {
  console.log(response.data.length);
  const myData = [];
  for (i = 0; i < response.data.length; i++) {
    name = response.data[i].name;
    abv = response.data[i].abv;
    ibu = response.data[i].ibu;
    myData.push({ name, abv, ibu });
  }

  const delimiter = ";";
  const fields = ["name", "abv", "ibu"];
  const opts = {
    fields,
    delimiter,
  };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(myData);

    const fileName = "Matlind.csv";
    fs.writeFileSync(fileName, csv);

    cron.schedule(
      " * 9 * * * * ",
      () => {
        console.log("Price updater email sent to Zava DE/Cs ");
        sendMail(fileName);
      },
      {
        schedule: true,
        timezone: "Europe/Berlin",
      }
    );

    // task.start()
  } catch (err) {
    console.error(err);
  }
});
