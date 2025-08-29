import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shortenRoutes from './routes/shorten.js';
import redirectsRoutes from './routes/redirects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
shortenRoutes(app);
redirectsRoutes(app);

app.listen(PORT, () => {
  console.log('POST /shorten');
  console.log('GET /:code');
});
