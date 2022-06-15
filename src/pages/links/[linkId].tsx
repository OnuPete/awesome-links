import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMeQuery } from '../../../generated/graphql';
import { graphQLClient } from '../../../lib/graphql-request';
import { Users } from '../../components/Users';

const ALink = () => {
  const { data } = useMeQuery(graphQLClient);
  console.log(data);
  const router = useRouter();
  const { linkId } = router.query;
  const bookmark = (data?.me.bookmarks || []).find(
    (bookmark) => bookmark.id === linkId
  );
  if (typeof window !== 'undefined' && !bookmark) {
    router.push(`/bookmarks/new?linkId=${linkId}`);
    return null;
  }
  return data?.me ? (
    <Users linkId={linkId} />
  ) : (
    <div>
      Must be logged in!
      <Link href="/api/auth/login">
        <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Login
        </a>
      </Link>
    </div>
  );
};

export default ALink;
