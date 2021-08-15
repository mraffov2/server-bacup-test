const mongoose = require('mongoose');

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB chat connected');
  } catch (error) {
    console.log(error);
    throw new Error('Something wrong with DB - Please contact to manager');
  }
};

module.exports = {
  dbConection,
};
