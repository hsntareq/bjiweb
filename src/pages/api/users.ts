import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = process.env.BJI_API_URL || 'http://localhost:3000';
  const response = await fetch(`${apiUrl}/users`);
  const data = await response.json();
  res.status(200).json(data);
}
