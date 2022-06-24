import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Create User Hook');
  const email = req.body.email || req.query.email;
  const name = req.body.name;
  const secret = req.body.secret || req.query.secret;
  console.log(req.body);
  console.log({ email, secret });
  // 2
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  // 3
  if (email) {
    // 4
    if (req.method === 'POST') {
      console.log('Creating User');
      await prisma.user.create({
        data: { email, name },
      });
      console.log('User Created');
      return res.status(200).json({
        message: `User with email: ${email} has been created successfully!`,
      });
    } else if (req.method === 'GET') {
      console.log('Fetching User');
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log('User: ', user);
      return res.status(200).json(user);
    } else {
      return res.status(403).json({ message: 'Method not allowed' });
    }
  }
};

export default handler;
