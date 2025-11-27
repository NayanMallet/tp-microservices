import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { createCorsMiddleware } from 'shared';
import itemRoutes from './routes/itemRoutes';
import { setupDb } from './config';

(async () => {
    const app = express();
    const db = await setupDb();
    const PORT = Number(process.env.ITEM_SERVICE_PORT) || 3003;

    app.use( createCorsMiddleware() );
    app.use(express.json());
    app.use(morgan('dev'));
    // health endpoint for docker
    app.get('/health', (_req, res) => res.json({ status: 'ok' }));
    app.use('/', itemRoutes(db));

    app.listen(PORT, () => {
        console.log(`Item Service listening on port ${PORT}`);
    });
})();
