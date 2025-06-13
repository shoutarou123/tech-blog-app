import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Qiita4PostsPage from "../components/4Posts-4BlogsPage/Qiita4PostsPage";

describe("Qiita4PostsPage", () => {
  it("fetchAllPostsが呼ばれること", async () => {
    const queryClient = new QueryClient();
    const spy = jest.spyOn(queryClient, "prefetchQuery");
    render(
      <QueryClientProvider client={queryClient}>
        <Qiita4PostsPage itemsWithOgp={[]} />
      </QueryClientProvider>
    );
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ queryKey: ["allposts"] }));
  });
});
