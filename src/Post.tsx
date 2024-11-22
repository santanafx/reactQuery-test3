import { useQuery } from "@tanstack/react-query";

interface PostProps {
  id: number;
}

const getPost = (id: number) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
};

export const Post = ({ id }: PostProps) => {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery.data?.userId],
    enabled: !!postQuery.data?.userId, //so chama o useQuery de userQuery quando postQuery.data?.userId for true
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/users/${postQuery.data?.userId}`
      ).then((res) => res.json()),
  });

  if (postQuery.status === "pending") {
    return <div>Loading...</div>;
  }

  if (postQuery.status === "error") {
    return <div>{JSON.stringify(postQuery.error)}</div>;
  }

  return (
    <div>
      <div>{postQuery.data?.title}</div>
      <div>{userQuery.isLoading ? "Loading..." : userQuery.data?.name}</div>
    </div>
  );
};
