import Box from '@mui/material/Box';

const PrivacyPolicyText = () => (
  <Box
    component={'section'}
    key={'privacy-policy-text-wrapper'}
    id={'privacy-policy-text-wrapper'}
    sx={{ paddingX: 2, fontSize: '1rem', color: '#1f1f1f' }}
  >
    <h1 style={{ textAlign: 'center' }}>Privacy Policy</h1>
    <p>
      This privacy policy explains how Andrew Klapper (owner of portfolio) collects, uses, and shares information when
      you authorize my developer website (<a href="https://andrew-k.us">https://andrew-k.us</a>) to access to your
      Google Calendar data.
    </p>
    <p>
      <strong>1. Information I Collect</strong>
    </p>
    <p>
      When you sign in to <a href="https://andrew-k.us">https://andrew-k.us</a> using Google OAuth2 and grant permission
      to view and manage your calendars, I collect the following information from your Google account:
    </p>
    <ul>
      <li>
        <strong>Basic Profile Information:</strong> Your name, email address, and profile picture.{' '}
      </li>
      <li>
        <strong>Calendar Data:</strong> This includes the titles, dates, times, descriptions, and attendees of events on
        your calendars. I may also create new calendar events on your behalf. I <strong>do not</strong> access sensitive
        information like locations or event notes.
      </li>
    </ul>
    <p>
      <strong>2. How I Use Your Information</strong>
    </p>
    <p>I use the information collected for the following purposes:</p>
    <ul>
      <li>
        <strong>Authentication:</strong> To verify your identity and allow you to access features on my website.{' '}
      </li>
      <li>
        <strong>Calendar Integration:</strong> To enable features that interact with your Google Calendar, such as:{' '}
        <ul>
          <li>
            Adding your suggested appointment time to your calendar &amp; sending me a notification to verify the time
            you request.{' '}
          </li>
          <li>Allowing you to schedule consultations or meetings directly through my website. </li>
          <li>Creating calendar reminders for important deadlines or events related to my services.</li>
        </ul>
      </li>
    </ul>
    <p>
      <strong>3. Information Sharing</strong>
    </p>
    <p>
      I <strong>do not</strong> share your personal information with any third parties, except as required by law or to
      comply with a legal process.
    </p>
    <p>
      <strong>4. Data Security</strong>
    </p>
    <p>
      I take reasonable measures to protect your information from unauthorized access, use, or disclosure. These
      measures include:
    </p>
    <ul>
      <li>
        <strong>Secure Storage:</strong> Storing your data on secure servers with limited access. I only put the time to
        live for the token for 5 minutes and do not store any data. You will need to authorize every time you want to
        make an appointment request{' '}
      </li>
      <li>
        <strong>Data Minimization:</strong> Collecting only the necessary information for the purposes described in this
        policy.{' '}
      </li>
      <li>
        <strong>Encryption:</strong> Using encryption to protect your data in transit and at rest.
      </li>
    </ul>
    <p>
      <strong>5. Your Choices</strong>
    </p>
    <p>
      You can revoke access to your Google Calendar data at any time by visiting your Google account settings and
      removing access for Andrew's Portfolio - Appointment Maker <a href="https://andrew-k.us">https://andrew-k.us</a>.
    </p>
    <p>
      <strong>6. Children&#39;s Privacy</strong>
    </p>
    <p>
      My website is not intended for children under the age of 13. I do not knowingly collect personal information from
      children.
    </p>
    <p>
      <strong>7. Changes to this Privacy Policy</strong>
    </p>
    <p>
      I may update this privacy policy from time to time. Any changes will be posted on this page with the updated date.{' '}
    </p>
    <p>
      <strong>8. Contact Me</strong>{' '}
    </p>
    <p>
      If you have any questions about this privacy policy, please contact me at{' '}
      <a href={'mailto:andrew@andrew-k.us'}>andrew@andrew-k.us</a>
    </p>
    <p>
      <strong>Effective Date:</strong> December 1st, 2024
    </p>
  </Box>
);

export default PrivacyPolicyText;
