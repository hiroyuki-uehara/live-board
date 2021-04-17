// module.exports = {
//   devServer: {
//     port: 8080,
//     disableHostCheck: true,
//   },
// };

module.exports = {
  devServer:{
    public: process.env["C9_PID"] + ".vfs.cloud9.us-east-1.amazonaws.com"
  }
};
