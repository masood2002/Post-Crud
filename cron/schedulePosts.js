// import { Post } from "../src/models/index.js";
// import { addMinutes } from "date-fns";

// export async function schedulePosts() {
//   console.log("hlo");
//   try {
//     const currentTime = new Date();
//     const fiveMinutesFromNow = addMinutes(currentTime, 2);
//     const chunkSize = 20;
//     let skip = 0;
//     let hasMorePosts = true;
//     const allPosts = [];

//     console.log(
//       `Scheduling messages for posts from ${currentTime} to ${fiveMinutesFromNow}`
//     );

//     // Fetch all posts in chunks of 20
//     while (hasMorePosts) {
//       const upcomingPosts = await Post.find({
//         scheduleDateTime: {
//           $gte: currentTime,
//           $lte: fiveMinutesFromNow,
//         },
//         status: "not-send",
//       })
//         .skip(skip)
//         .limit(chunkSize);

//       if (upcomingPosts.length === 0) {
//         hasMorePosts = false;
//       } else {
//         allPosts.push(...upcomingPosts);
//         skip += chunkSize;
//       }
//     }

//     console.log(`${allPosts.length} posts found for scheduling.`);

//     // Schedule messages for all posts concurrently
//     const schedulingPromises = allPosts.map(async (post) => {
//       const delay = post.scheduleDateTime - currentTime;

//       return new Promise((resolve) => {
//         setTimeout(async () => {
//           console.log(
//             `Post with ID ${post._id} is scheduled for ${post.scheduleDateTime}.`
//           );

//           try {
//             // Simulate posting to each channel concurrently
//             await Promise.all(
//               post.channels.map(async (channel) => {
//                 switch (channel) {
//                   case "facebook":
//                     console.log(`Posting on Facebook for Post ID ${post._id}.`);
//                     // Simulate posting to Facebook
//                     // await postToFacebook(post);
//                     break;
//                   case "instagram":
//                     console.log(
//                       `Posting on Instagram for Post ID ${post._id}.`
//                     );
//                     // Simulate posting to Instagram
//                     // await postToInstagram(post);
//                     break;
//                   case "twitter":
//                     console.log(`Posting on Twitter for Post ID ${post._id}.`);
//                     // Simulate posting to Twitter
//                     // await postToTwitter(post);
//                     break;
//                   default:
//                     console.log(
//                       `Post with ID ${post._id} has an unknown channel: ${channel}.`
//                     );
//                 }
//               })
//             );

//             // Update the post status to 'sent'
//             post.status = "sent";
//             await post.save();
//           } catch (error) {
//             console.error(`Error posting for Post ID ${post._id}:`, error);
//           }

//           resolve();
//         }, delay);
//       });
//     });

//     // Wait for all scheduling promises to complete
//     await Promise.all(schedulingPromises);
//   } catch (error) {
//     console.error("Error scheduling post messages:", error);
//   }
// }
import { Post } from "../src/models/index.js";
import { addMinutes } from "date-fns";
import pLimit from 'p-limit';

// Limit the number of concurrent tasks
const limit = pLimit(5);

export async function schedulePosts() {
  console.log("Starting post scheduling...");
  
  try {
    const currentTime = new Date();
    const fiveMinutesFromNow = addMinutes(currentTime, 2);

    console.log(`Fetching posts from ${currentTime} to ${fiveMinutesFromNow}`);
    
    // Fetch posts that need scheduling
    const allPosts = await Post.find({
      scheduleDateTime: {
        $gte: currentTime,
        $lte: fiveMinutesFromNow,
      },
      status: "not-send",
    }).lean(); // Use lean() to return plain JavaScript objects

    console.log(`${allPosts.length} posts found for scheduling.`);

    // Schedule messages for all posts concurrently with a concurrency limit
    const schedulingPromises = allPosts.map(post => 
      limit(async () => {
        const delay = post.scheduleDateTime - currentTime;

        await new Promise(resolve => setTimeout(resolve, delay));

        console.log(`Post with ID ${post._id} is scheduled for ${post.scheduleDateTime}.`);

        try {
          // Simulate posting to each channel concurrently
          await Promise.all(post.channels.map(async (channel) => {
            switch (channel) {
              case "facebook":
                console.log(`Posting on Facebook for Post ID ${post._id}.`);
                // await postToFacebook(post);
                break;
              case "instagram":
                console.log(`Posting on Instagram for Post ID ${post._id}.`);
                // await postToInstagram(post);
                break;
              case "twitter":
                console.log(`Posting on Twitter for Post ID ${post._id}.`);
                // await postToTwitter(post);
                break;
              default:
                console.log(`Post with ID ${post._id} has an unknown channel: ${channel}.`);
            }
          }));

          // Update the post status to 'sent'
          await Post.updateOne({ _id: post._id }, { status: "sent" });
        } catch (error) {
          console.error(`Error posting for Post ID ${post._id}:`, error);
        }
      })
    );

    // Wait for all scheduling promises to complete
    await Promise.all(schedulingPromises);
    console.log("All posts have been scheduled.");
  } catch (error) {
    console.error("Error scheduling post messages:", error);
  }
}
