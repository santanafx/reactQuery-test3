import { useQuery } from "@tanstack/react-query";

const getPosts = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
    res.json()
  );
};

export const PostsList1 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // staleTime: 5000,
    // refetchInterval: 5000, //configura o tempo para dar um refetch na query
  });

  if (postsQuery.status === "pending") {
    return <div>Loading...</div>;
  }

  if (postsQuery.status === "error") {
    return <div>{JSON.stringify(postsQuery.error)}</div>;
  }

  return (
    <div>
      <h1>Posts list 1</h1>
      <ol>
        {postsQuery.data.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
      <br />
    </div>
  );
};