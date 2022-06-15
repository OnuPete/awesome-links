import Link from 'next/link';
import React from 'react';
import { useLinkQuery } from '../../generated/graphql';
import { graphQLClient } from '../../lib/graphql-request';

export const Users = ({ linkId }) => {
  const { data } = useLinkQuery(graphQLClient, { linkId: linkId as string });
  const link = data?.link;
  const users = link?.users || [];
  console.log({ link });
  return (
    <>
      {users.map((user, id) => (
        <Link href={`/chats/chat`}>
          <a key={`${user.name}-${id}`} className="shadow  max-w-md  rounded">
            <img src={user.image} />
            <div className="p-5 flex flex-col space-y-2">
              <p className="text-lg font-medium">{user.name}</p>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};
