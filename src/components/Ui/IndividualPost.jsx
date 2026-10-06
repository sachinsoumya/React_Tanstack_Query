import { useParams } from "react-router-dom";
import { fetchIndividualPost } from "../../API/api";
import { useQuery } from "@tanstack/react-query";

export const IndividualPost = () => {
  const { id } = useParams();
  // console.log(id);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchIndividualPost(id),
  });

  console.log(data);

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message || "something went wrong"}</h1>;

  return (
    <div className="flex justify-center ">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{data.title}</h2>
          <p>{data.body}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now {data.id}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
