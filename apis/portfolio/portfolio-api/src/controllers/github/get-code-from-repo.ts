import axios from 'axios';
import type { Request, Response } from 'express';

const getCodeFromRepo = async (req: Request, resp: Response) => {
  try {
    const { page } = req.query;

    const code = await axios.get(`https://api.github.com/repos/AndrewK4758/BGDK/contents/${page}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    });

    const { content } = code.data;

    const decoded = Buffer.from(content, 'base64').toString('utf8');
    console.log(decoded);

    resp.status(200).send(decoded);
  } catch (error) {
    console.error(error);
    resp.status(500).send(null);
  }
};

export default getCodeFromRepo;
