import type { NextFunction, Request, Response } from 'express';
import { google, type Auth } from 'googleapis';
import userTokensMap from '../../models/users-tokens-map';
import oauth2Client from '../../services/google-oauth';

const createEvents = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const userID = req.cookies['OAUID'];

    if (!userID) {
      resp.status(404).json({ message: 'Please connect Google Calendar to continue.' });
    }
    const tokens = userTokensMap.get(userID as string) as Auth.Credentials;

    const REFRESH_TOKEN = tokens.refresh_token;

    const { start, end } = req.body;

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const calendarClient = google.calendar('v3');

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
        attendees: [
          {
            displayName: 'Andrew Klapper',
            email: 'andrew@andrew-k.us',
            comment:
              'Thanks for setting a time to get together. Please feel free to schedule a Google Meet video conference if that is your preference. If you need to reschedule, please update the event and I will respond with a confirmation.',
          },
        ],
        colorId: '2',
      },

      sendNotifications: true,
    });

    resp.status(201).json({ result });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default createEvents;
