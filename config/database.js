import mongoose from 'mongoose'

mongoose.connect(
  'mongodb://127.0.0.1:27017/project-4-3'

);

const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});