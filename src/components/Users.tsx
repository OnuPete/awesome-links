import Link from 'next/link';
import { graphQLClient } from '../lib/graphql-request';
import { useLinkQuery } from '../queries/link.graphql';
import { Spinner } from './Spinner';

export const Users = ({ linkId }) => {
  const { data, isLoading } = useLinkQuery(graphQLClient, {
    linkId: linkId as string,
  });
  const link = data?.link;
  const users = link?.users || [];
  if (isLoading) return <Spinner />;
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
