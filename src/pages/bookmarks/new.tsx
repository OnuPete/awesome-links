import { getSession } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { graphQLClient } from '../../lib/graphql-request';
import { useCreateUserBookmarkMutation } from '../../queries/createUserBookmark.graphql';

const NewBookmark = () => {
  const router = useRouter();
  const linkId = router.query.linkId as string;
  console.log(router.query);
  console.log({ linkId });
  const createUserBookmark = useCreateUserBookmarkMutation(graphQLClient);
  const handleAddToBookmarks = async () => {
    try {
      await createUserBookmark.mutateAsync({ linkId });
      toast.success('Redirecting to link.');
      router.push(`/links/${linkId}`);
    } catch (err) {
      toast.error('Error adding bookmark.');
      console.error(err);
    }
  };
  return <button onClick={handleAddToBookmarks}>Add To Bookmarks</button>;
};

export const getServerSideProps = async function ({ req, res }) {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    };
  }
  return { props: {} };
};

export default NewBookmark;
