import { useLoaderData } from '@tanstack/react-router';

export const Search = () => {
  const { data } = useLoaderData({ from: '/search/' });
  console.log({ data });
  return (
    <div className="space-y-4">
      <h1>Search Results</h1>
      {/* {data?.length > 0 ? (
        data.map((item: unknown) => item)
      ) : (
        <p>No results found.</p>
      )} */}
    </div>
  );
};
