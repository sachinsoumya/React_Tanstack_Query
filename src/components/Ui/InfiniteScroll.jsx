import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../API/api";

import { useInView } from "react-intersection-observer";

import { useEffect } from "react";

export const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["Users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage);
        console.log(allPages);
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  console.log(data);
  console.log(hasNextPage);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // console.log(fetchNextPage());

  return (
    data && (
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* mapping over rows */}

              {data.pages.map((item) => {
                return item.map((profile) => {
                  return (
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={`${profile.avatar_url}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{profile.login}</div>
                            {/* <div className="text-sm opacity-50">United States</div> */}
                          </div>
                        </div>
                      </td>
                      <td>
                        Zemlak, Daniel and Leannon
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Desktop Support Technician
                        </span>
                      </td>
                      <td>Purple</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
        <div ref={ref}>
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
              ? "scroll down to load more"
              : "No more user"}{" "}
        </div>
      </div>
    )
  );
};
