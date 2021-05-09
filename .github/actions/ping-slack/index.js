const core = require("@actions/core");
const github = require("@actions/github");
const getSlackPayload = require("./utils/slackPayload");
const { default: axios } = require("axios");

const sample_payload = require("./utils/samplePayload.json");

try {
  //   const webhookUrl = core.getInput("slack-webhook-url");
  const event = core.getInput("type");
  const time = new Date().toTimeString();
  core.setOutput("time", time);

  var payload = JSON.stringify(github.context.payload, undefined, 2);
  if (payload === {}) {
    payload = sample_payload;
  }
  const {
    ref,
    repository: { html_url: repoUrl, full_name: repoName },
    sender: { login: authorName, url: senderUrl, avatar_url: senderAvatarUrl },
  } = sample_payload;
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
  console.log("eNv", process.env.SLACK_WEBHOOK_URL);

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
