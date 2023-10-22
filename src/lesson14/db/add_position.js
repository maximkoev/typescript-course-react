import * as fs from "fs";

const fileData = fs.readFileSync("db.json");
const data = JSON.parse(fileData);
data.users.forEach((u) => {
  u["position"] = u.id;
});
fs.writeFileSync("./src/lesson14/db/db.json", JSON.stringify(data));
