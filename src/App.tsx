import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import { PostsList1 } from "./PostsList1";
import { PostsList2 } from "./PostsList2";

const POSTS = [
  { id: "1", title: "post 1" },
  { id: "2", title: "post 2" },
];

const testFunction = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  const queryClient = useQueryClient();
  // const postsQuery = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: () => testFunction().then(() => [...POSTS]),
  //   staleTime: 0, //configuracao que define o tempo que o dado é considerado desatualizado. Por default o staleTime e 0
  // });

  const newPostMutation = useMutation({
    mutationFn: (title: string) =>
      testFunction().then(() =>
        POSTS.push({ id: crypto.randomUUID(), title: title })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // isto invalida tudo que estiver no array de queryKey fazendo com que force um refetch
    },
  });

  // if (postsQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {/* TODO EXEMPLO 1 */}

      {/* <div>
        {postsQuery.data?.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
        <button
          onClick={() => newPostMutation.mutate("new post")}
          disabled={newPostMutation.isPending}
        >
          Add new Post
        </button>
      </div> */}

      {/* TODO EXEMPLO 2 */}
      {/* neste exemplo é importante notar o funcionamento do react query, quando mudamos nas configuracoes do navegador para slow 3G e mudamos de pagina o comportamento das queries mudam de stale para fetching. Isto ocorre porque o staleTime por default é 0. Ou seja, quando entramos em uma pagina diferente e chamamos o hook useQuery e pelo fato do staleTime ser 0 o useQuery vai considerar que os dados estao desatualizados e vai realizar um novo fetch */}
      {/* <div>
        <button onClick={() => setCurrentPage(<PostsList1 />)}>
          Post list 1
        </button>
        <button onClick={() => setCurrentPage(<PostsList2 />)}>
          Post list 2
        </button>
        <br />
        {currentPage}
      </div> */}

      {/* TODO EXEMPLO 3 */}
      {/* <div>
        <button onClick={() => setCurrentPage(<Post id={1} />)}>
          Post exemple Id
        </button>
        <br />
        {currentPage}
      </div> */}

      {/* TODO EXEMPLO 4 */}
      <div>
        <button onClick={() => setCurrentPage(<CreatePost />)}>
          Create post
        </button>
        <br />
        {currentPage}
      </div>

      {/* TODO nao foi abordado pagination, infinite scroll,  */}
    </>
  );
}

export default App;
