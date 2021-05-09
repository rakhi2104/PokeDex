const core = require("@actions/core");
const github = require("@actions/github");
const getSlackPayload = require("./utils/slackPayload");
const { default: axios } = require("axios");

const sample_payload = require("./utils/samplePayload.json");

try {
  var payload = JSON.stringify(github.context.payload, undefined, 2);
  if (payload === {}) {
    payload = sample_payload;
  }
  const {
    ref,
    repository: { html_url: repoUrl, full_name: repoName },
    sender: { login: authorName, url: senderUrl, avatar_url: senderAvatarUrl },
  } = payload;
  core.info("Creating payload ...");
  const slackMessagePayload = getSlackPayload({
    repoName,
    repoUrl,
    ref,
    authorName,
    senderAvatarUrl,
    senderUrl,
  });
  core.info("Sending Message ...");

  // Post Message
  axios
    .post(process.env.SLACK_WEBHOOK_URL, slackMessagePayload)
    .then(() => {
      process.exitCode = 0;
      return core.info("Message Sent! Shutting down.");
    })
    .catch((err) => {
      process.exitCode = 1;
      const errMsg = err.response ? err.response.data : err.message;
      return core.setFailed(`Err: ${errMsg}`);
    });
} catch (e) {
  console.log(e);
  core.setFailed(e.message);
}
