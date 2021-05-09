const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");
const getSlackPayload = require("./utils/slackPayload");
const { default: axios } = require("axios");

const sample_payload = require("./utils/samplePayload.json");

try {
  var payload = github.context.payload;
  const type = core.getInput("action_type") || "push";
  if (payload === {}) {
    payload = sample_payload;
  }
  core.info("Creating payload ...");
  const slackMessagePayload = getSlackPayload({
    repoName: _.get(payload, "repository.repoName", ""),
    repoUrl: _.get(payload, "repository.html_url", ""),
    ref: _.get(payload, "ref", ""),
    authorName: _.get(payload, "sender.login", ""),
    senderAvatarUrl: _.get(payload, "sender.avatar_url", ""),
    senderUrl: _.get(payload, "sender.html_url", ""),
    type,
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
