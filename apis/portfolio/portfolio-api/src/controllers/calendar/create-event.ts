import type { NextFunction, Request, Response } from 'express';
import { calendar } from 'googleapis/build/src/apis/calendar';
import oauth2Client from '../../services/google-oauth';
const REFRESH_TOKEN =
  '1//01XwZo06V4XTaCgYIARAAGAESNwF-L9IrurqdVVt89nHiYfBLa3GD4pxrLkf6bZtncuwPIPPMPPJQjMe8Plek51WryY0ZjxthH3o';

const createEvents = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    console.log(REFRESH_TOKEN);

    const { start, end } = req.body;

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const calendarClient = calendar('v3');

    const result = await calendarClient.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: 'Meeting w/ Andrew Klapper',
        start: {
          dateTime: start,
        },
        end: {
          dateTime: end,
        },
        eventType: 'default',
      },
    });

    console.log(result);
    resp.status(201).json({ result });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default createEvents;
