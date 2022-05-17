import Head from 'next/head';
import { graphQLClient } from '../../lib/graphql-request';
import { AwesomeLink } from '../components/AwesomeLink';
import { useAllLinksInfiniteQuery } from '../queries/useAllLinksInfiniteQuery';

export default function Home() {
  // const [after, setAfter] = useState<string>()
  const {data, isLoading, error, fetchNextPage, hasNextPage } = useAllLinksInfiniteQuery(graphQLClient, {
    first: 2,
    // after,
  }, {getNextPageParam: (lastPage) => lastPage.links.pageInfo.endCursor})
  if (isLoading || error) return <p>Loading...</p>
  if (error) return <p>Oh no... {error}</p>

  const links = data.pages.reduce((links, page) => {
    links.push(...page.links.edges.map(edge => edge.node))
    return links
  }, [])
  // const { endCursor, hasNextPage} = data.pages[0]

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((link) => (
            <AwesomeLink
              key={link.id}
              title={link.title}
              category={link.category}
              url={link.url}
              id={link.id}
              description={link.description}
              imageUrl={link.imageUrl}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => fetchNextPage()}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You've reached the end!{" "}
          </p>
        )}
        </div>
    </div>
  );
}
