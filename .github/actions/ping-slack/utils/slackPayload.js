const getSlackPayload = (params) => {
  const {
    authorName,
    ref,
    repoUrl,
    repoName,
    senderUrl,
    senderAvatarUrl,
    type,
  } = params;
  const msg =
    type === "push"
      ? `You have a new push to:\n*<${repoUrl}|${repoName}>*`
      : `New PR has been merged to *main* branch on:\n*<${repoUrl}|${repoName}>*`;
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: msg,
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
