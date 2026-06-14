import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

// x = number of weeks back, y = number of days back from that
const markCommit = (6, 4) => {
    const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .subtract(6, "w")
        .subtract(4, "d")
        .format("YYYY-MM-DD HH:mm:ss");

    const data = { date };

    jsonfile.writeFile(path, data)
        .then(() => {
            console.log("Saved:", data);
            return simpleGit()
                .add([path])
                .commit(date, { "--date": date })
                .push();
        })
        .catch((err) => console.error("Error:", err));
};

// Example: commit as if it were 1 week and 1 day ago
markCommit(6, 4);
