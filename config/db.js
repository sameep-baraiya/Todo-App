const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let conn;
    if (process.env.NODE_ENV === 'development') {
      conn = await mongoose.connect(process.env.MONGO_URI_DEV, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    } else if (process.env.NODE_ENV === 'production') {
      conn = await mongoose.connect(process.env.MONGO_URI_PROD, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    } else {
      console.log('Error in process.env'.red.inverse);
    }
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
