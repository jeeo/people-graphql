const { connect } = require('mongoose');

module.exports = ({
  databaseConnection: (connection) => connect(connection, {useNewUrlParser: true, useUnifiedTopology: true }),
});