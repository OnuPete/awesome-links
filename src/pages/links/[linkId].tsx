import Link from 'next/link';
import { useRouter } from 'next/router';
import { Spinner } from '../../components/Spinner';
import { Users } from '../../components/Users';
import { graphQLClient } from '../../lib/graphql-request';
import { useMeQuery } from '../../queries/me.graphql';

const LinkComponent = () => {
  const { data, isLoading } = useMeQuery(graphQLClient);
  console.log(data);
  const router = useRouter();
  const { linkId } = router.query;
  const bookmark = (data?.me.bookmarks || []).find(
    (bookmark) => bookmark.id === linkId
  );

  if (isLoading) return <Spinner />;

  if (!data?.me) {
    return (
      <div>
        Must be logged in!
        <Link href="/api/auth/login">
          <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Login
          </a>
        </Link>
      </div>
    );
  }

  if (typeof window !== 'undefined' && !bookmark) {
    router.push(`/bookmarks/new?linkId=${linkId}`);
    return null;
  }
  return <Users linkId={linkId} />;
};

export default LinkComponent;
