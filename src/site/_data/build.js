module.exports = {
  assetVersion: (process.env.COMMIT_REF || Date.now().toString(36)).slice(0, 12)
};
