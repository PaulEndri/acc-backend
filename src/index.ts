import Koa from 'koa';
import mongoose from 'mongoose';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import { PlayerController } from './controllers/player';

dotenv.config();

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING || '', { useUnifiedTopology: true });
mongoose.connection.on('error', console.error);

const app = new Koa();
const router = new KoaRouter({ prefix: '/api' });
const controller = new PlayerController();

// Only three routes, we can handle it for now.
router
	.get('/player/:googleId', controller.get)
	.post('/player', controller.create)
	.put('/player/:googleId', controller.update);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(process.env.PORT, () => {
	console.log(`App succesfully started on http://localhost:${process.env.PORT}`);
});
