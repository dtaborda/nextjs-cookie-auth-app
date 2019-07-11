import * as bodyParser from 'body-parser';
import * as express from 'express';
import { arrayBufferToBase64, base64Flag } from '../src/utils/images';

const router = express.Router();

router.use(bodyParser.json());

const fetchWrapperImg = async(route: string, token: string, res: any) => {
  const url = `https://dev.sigsense.tech${route}`;
  try {
    const response = await fetch(url, {
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'image/png',
      },
    });
    if (response.ok) {
      const imageStr = await arrayBufferToBase64(response);
      return `${base64Flag}${imageStr}`;
    }
    return res.status(response.status).send(response.statusText);
  } catch (error) {
    throw res.status(error.statusCode).send(error.statusText);
  }
};

const fetchWrapper = async(route: string, token: string, res: any) => {
  const url = `https://dev.sigsense.tech${route}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-access-token': `${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return (data);
    }
    return res.status(response.status).send(response.statusText);
  } catch (error) {
    throw res.status(error.statusCode).send(error.statusText);
  }
};

router.get('/api/details/:id', async (req, res) => {
  const id = req.params.id;
  if (!('authorization' in req.headers)) {
    throw res.status(401).send('Authorization header missing');
  }
  const auth: any = await req.headers.authorization;
  const { token } = JSON.parse(auth);
  const assetsResponse = await fetchWrapper(`/companies/${id}/assets`, token, res);

  const datas = await Promise.all(
    assetsResponse.items.map(
      async (info: string) => {
        const assetsDetails = await fetchWrapper(info, token, res);
        const imgSrc = await fetchWrapperImg(`${info}/image`, token, res);
        return {
          ...assetsDetails,
          imgSrc,
        };
      },
    ),
  );
  res.status(200).send(datas);
});

export default router;
