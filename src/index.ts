import Koa from 'koa';
import mongoose from 'mongoose';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import { PlayerController } from './controllers/player';

dotenv.config();

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING || '', { useUnifiedTopology: true });
mongoose.connection.on('error', console.error);

const prefix = process.env.NODE_ENV === 'local' ? '/api' : '/.netlify/functions/server';
const app = new Koa();
const router = new KoaRouter({ prefix });
const controller = new PlayerController();

// Only three routes, we can handle it for now.
router
	.get('/player/:googleId', controller.get)
	.post('/player', controller.create)
	.put('/player/:googleId', controller.update);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

if (process.env.NODE_ENV === 'local') {
	app.listen(process.env.PORT, () => {
		console.log(`App succesfully started on http://localhost:${process.env.PORT}`);
	});
}

module.exports = app;
module.exports.handler = serverless(app);
