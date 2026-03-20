const {Pool} = require('pg');
require('dotenv').config();
 try
  {
  const pool = new Pool({
      user:process.env.USERNAME,
      host:process.env.HOSTNAME,
      database:process.env.DATABASE,
      password:process.env.PASSWORD,
      port:process.env.DATABASE_PORT
    })
  }catch(err)
  {
    console.error('Error connecting to PostgreSQL database', err);
  }
console.log('Connected to PostgreSQL database');
module.export = pool;
