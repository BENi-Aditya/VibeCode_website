import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const waitlistPath = path.join(process.cwd(), 'data', 'waitlist.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Read existing data
      let waitlist = [];
      try {
        const fileContents = await fs.readFile(waitlistPath, 'utf8');
        waitlist = JSON.parse(fileContents);
      } catch (error) {
        // File doesn't exist yet
        await fs.mkdir(path.dirname(waitlistPath), { recursive: true });
      }

      // Add new submission
      waitlist.push({
        ...req.body,
        timestamp: new Date().toISOString()
      });

      // Save updated data
      await fs.writeFile(waitlistPath, JSON.stringify(waitlist, null, 2));

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving waitlist submission:', error);
      return res.status(500).json({ error: 'Failed to save submission' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
