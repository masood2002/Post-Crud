import axios from "axios";

const fbPosting = async () => {
  console.log("helo");
  const url = "https://graph.facebook.com/v20.0/me/photos";
  const body = {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP9_oe_j188K-JmtkmaMRNxg94LgcEUCH-phyy5LeIvV-VKfXMpZpqvF_SkBcCR1EYxY8&usqp=CAU",
    caption: `An unforgettable moment on the pitch today! 🏏 Just when you thought things couldn't get more exciting, Nadeem turns the tables by sending Naseem heading back to the pavilion with a classic run out! Truly proof of why cricket is called a game of uncertainty! 🙌 💥

  Indeed, it's not every day you see a gear shift of this magnitude. A big shout-out to Nadeem for his exceptional bowling skills. No boundaries, no runs, just sheer strategic play was what it took to turn this game around! 👏🏽

  If you thought Naseem's innings were over too soon – well, that's the name of the game! 😶 Sometimes one ball is all it takes to change the course of the match. Better luck next time, Naseem! 🍀

  Remember, folks - it's not just about the four's and six's - it's about strategy, skills and a whole lot of surprises! Can't wait to see what the next match brings. 🤩🔥

  #HeroicBowler #NadeemVictory #CricketGame #RunOut #NoRunsNoBoundries #OneBallGame #GameChanger #CricketFans #CricketLove #MasterPlan #BowlingSkills #FieldingWin #NeverMissABall`,
    access_token:
      "EAAHeAoxheGQBOw2Pmmo9BLZAl0shpDvFKZBipe6fLZAOivDKAq2jGVBYIKINEmuwJuwFaTkIofHorfLeKeeAkLZA2YgWC17Hbg7Cgs0xCdBKVZBPJZCI2yBYXvPwIPV0P2EIrzN3doE2kPfBXiu74XRj345Ef6xnz56TVxwQZAS5LpHssW8mOOD9Q3xN9khWV5xCIF2yHFz8tJAtIP9oXKvpY4ZD",
  };
  // const body = {
  //   url: imageUrl,
  //   caption: content,
  //   access_token:
  //     "EAAGCvNkPfwIBO4rZAZAdgCcvC4dLkZCnXL8ZA6c7zLGRytGEapnlZBYKNwQ8wbX3QiHnppkN2d2jQz8AlagzUqxLEti92zKLfxZCT2pEeCAQ7cyl2T7Dm8JvCwhEJKXcuis7lt56jOVq9UGeVrAXeF13ccOySq6Kl4CLSk1y6ePHUALb5F1vRSXa25KhdKOFjUPO47bZCJ1eqw3R2YxXuFwiC4ZD",
  // };
  try {
    // console.log(body);
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("helo 2 ");
    // console.log("API response:", response.data);
    console.log("Posted on Facebook");
    return;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
export { fbPosting };
