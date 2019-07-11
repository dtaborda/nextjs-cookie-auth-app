import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as next from 'next';
import sigsensetechApi from './sigsensetechApi';

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.set('trust proxy', true);

server.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
server.use(helmet());

server.use(sigsensetechApi);

server.get('/', (req, res) => {
  return app.render(req, res, '/', req.query);
});

server.get('/dashboard', (req, res) => {
  return app.render(req, res, '/dashboard', req.query);
});

server.get('/error', (req, res) => {
  return app.render(req, res, '/error', req.query);
});

server.get('*', (req: any, res: any) => handle(req, res));

export default app
  .prepare()
  .then(() => {
    // Create the http server and return it like this for jest testing
    const httpServer = http.createServer(server);
    httpServer.listen(port, () =>
      console.log(` !!!! Listening on port http://localhost:${port}`),
    );
    return [httpServer, app];
  })
  .catch(console.error) as Promise<[http.Server, next.Server]>;
