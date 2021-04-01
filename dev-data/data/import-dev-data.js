const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tours = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('DATABASE connect scsesfully');
  });

const tour = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

const importData = async () => {
  try {
    await Tours.create(JSON.parse(tour));
    console.log('data succesfully loaded!');
    process.exit();
  } catch (error) {
    console.log('error');
  }
};

const deleteData = async () => {
  try {
    await Tours.deleteMany();
    console.log('data succesfully deleted!');
    process.exit();
  } catch (error) {
    console.log('error');
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
