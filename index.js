import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// One backdated commit. x = weeks back, y = days back from that.
const markCommit = (x, y) => {
    const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .subtract(x, "w")
        .subtract(y, "d")
        .format("YYYY-MM-DD HH:mm:ss");

    const data = { date };

    return jsonfile.writeFile(path, data)
        .then(() => git.add([path]).commit(date, { "--date": date }).push())
        .then(() => console.log("Committed:", date))
        .catch((err) => console.error("Error:", err));
};

// 50 commits on random days within roughly the past year, in series.
const makeCommits = async (n) => {
    for (let i = 0; i < n; i++) {
        const x = random.int(0, 154); // 0-154 weeks back
        const y = random.int(0, 6);  // 0-6 days back from that
        await markCommit(x, y);
    }
    console.log(`Done: ${n} commits made.`);
};

makeCommits(154);
