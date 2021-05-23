const mongoose = require("mongoose");
const dbName = "ecox-in";

async function dbConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://MongoDbUser:aditya1997@neog-cluster.d8w2z.mongodb.net/${dbName}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log(`connection successfull with database ${dbName}`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { dbConnection };
