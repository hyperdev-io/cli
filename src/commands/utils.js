const colors = require("colors");

module.exports = {
  handleError: (vorpal, error) => {
    if (error.graphQLErrors && error.graphQLErrors[0]) {
      vorpal.log(error.graphQLErrors[0].message);
    } else if (error.message) {
      vorpal.log(error.message);
    } else {
      vorpal.log(colors.red("Unknown error:"));
      vorpal.log(error);
    }
  }
};
