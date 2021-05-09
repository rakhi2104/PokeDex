const getSlackPayload = (params) => {
  const {
    authorName,
    ref,
    repoUrl,
    repoName,
    senderUrl,
    senderAvatarUrl,
  } = params;
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `You have a new push to:\n*<${repoUrl}|${repoName}>*`,
        },
      },
      {
        type: "section",
        accessory: {
          type: "image",
          image_url: senderAvatarUrl,
          alt_text: "Sender Profile",
        },
        fields: [
          {
            type: "mrkdwn",
            text: `*Author:*\n<${senderUrl}|${authorName}>`,
          },
          {
            type: "mrkdwn",
            text: `*ref:*\n${ref}`,
          },
        ],
      },
    ],
  };
};

module.exports = getSlackPayload;
