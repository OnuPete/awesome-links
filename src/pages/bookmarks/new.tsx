import { useRouter } from 'next/router';
import React from 'react';
import { useCreateUserBookmarkMutation } from '../../../generated/graphql';
import { graphQLClient } from '../../../lib/graphql-request';

const NewBookmark = () => {
  const router = useRouter();
  const linkId = router.query.linkId as string;
  console.log(router.query);
  console.log({ linkId });
  const createUserBookmark = useCreateUserBookmarkMutation(graphQLClient);
  const handleAddToBookmarks = async () => {
    try {
      await createUserBookmark.mutateAsync({ linkId });
      router.push(`/links/${linkId}`);
    } catch (err) {
      console.error(err);
    }
  };
  return <button onClick={handleAddToBookmarks}>Add To Bookmarks</button>;
};

export default NewBookmark;
