import axios from "axios";

const igPosting = async (content, imageUrl) => {
  const getInstagramAccountId = async (pageId, accessToken) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v20.0/${pageId}`,
        {
          params: {
            fields: "instagram_business_account",
            access_token: accessToken,
          },
        }
      );

      const instagramAccountId = response.data.instagram_business_account.id;
      // console.log("Instagram Business Account ID:", instagramAccountId);
      return instagramAccountId;
    } catch (error) {
      console.error(
        "Error fetching Instagram Account ID:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };
  const addInstagramPost = async (instagramUserId, accessToken) => {
    // console.log("Uploading to Instagram...");

    const image = imageUrl;
    // console.log(imageUrl);
    const caption = content;
    try {
      // Step 1: Create Media Object
      const mediaResponse = await axios.post(
        `https://graph.facebook.com/v20.0/${instagramUserId}/media`,
        {
          image_url: image,
          caption: caption,
          access_token: accessToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const creationId = mediaResponse.data.id;
      // console.log("Media object created with ID:", creationId);

      // Step 2: Publish Media Object
      const publishResponse = await axios.post(
        `https://graph.facebook.com/v20.0/${instagramUserId}/media_publish`,
        {
          creation_id: creationId,
          access_token: accessToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Media published:", publishResponse.data);
      console.log("Posted on Instagram");
      return;
    } catch (error) {
      console.error(
        "Error uploading to Instagram:",
        error.response ? error.response.data : error.message
      );
      throw new Error(error.message);
    }
  };

  // Example usage
  const pageId = "106853855657467"; // Replace with your Facebook Page ID
  const accessToken =
    "EAAHeAoxheGQBOw2Pmmo9BLZAl0shpDvFKZBipe6fLZAOivDKAq2jGVBYIKINEmuwJuwFaTkIofHorfLeKeeAkLZA2YgWC17Hbg7Cgs0xCdBKVZBPJZCI2yBYXvPwIPV0P2EIrzN3doE2kPfBXiu74XRj345Ef6xnz56TVxwQZAS5LpHssW8mOOD9Q3xN9khWV5xCIF2yHFz8tJAtIP9oXKvpY4ZD";
  const instaId = await getInstagramAccountId(pageId, accessToken);

  await addInstagramPost(instaId, accessToken);
};

export { igPosting };
