import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const POSTS = [
  { id: "1", title: "post 1" },
  { id: "2", title: "post 2" },
];

const testFunction = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

export const CreatePost = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => testFunction().then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    // mutationFn: (variables) => console.log(variables), // variables é oque vc passa como parametro para funcao do mutate
    mutationFn: (title: string) =>
      testFunction().then(() =>
        POSTS.push({ id: crypto.randomUUID(), title: title })
      ),
    // onMutate: (variables) => {
    //   //é chamado antes da mutation ser chamado
    //   console.log(variables);
    //   return {
    //     test: "test",
    //   };
    // },
    onSuccess: (data, variables, context) => {
      console.log(data);
      console.log(variables);
      console.log(context);
      setTitle("");
      queryClient.setQueryData(["posts"], data); //dar update manualmente no cache
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: true }); // só da refecth se a queryKey for exatamente "posts", ["posts", id] por exemplo não da refetch
    },
    // onError: (error, variables, context) => {
    //   console.log(error);
    //   console.log(variables);
    //   console.log(context);
    // },
    // onSettled: (data, error, variables, context) => { //é como se fosse o finally do try catch
    //   console.log(data);
    //   console.log(error);
    //   console.log(variables);
    //   console.log(context);
    // },
  });

  const [title, setTitle] = useState("");

  return (
    <div>
      {Array.isArray(postsQuery.data) &&
        postsQuery.data.map((post) => <div key={post.id}>{post.title}</div>)}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => newPostMutation.mutateAsync(title)}>Create</button>
    </div>
  );
};
