import { screen } from "@testing-library/dom";
import Cms4BlogsPage from "../components/4Posts-4BlogsPage/Cms4BlogsPage";
import { render } from "@testing-library/react";
import { BlogResponse } from "../../../types";

describe("Cms4BlogsPage", () => {
  it("ブログ記事のタイトルが表示されていること", async () => {
    const mockCmsData: BlogResponse = {
      contents: [
        {
          id: "microcms-id",
          createdAt: "20251111",
          title: "ブログ記事１",
          content: "ブログ内容",
        },
      ],
    };

    render(<Cms4BlogsPage cmsData={mockCmsData} />);
    expect(await screen.findByText("ブログ記事")).toBeInTheDocument();
  });

  it("もっと見るボタンが表示されていること", async () => {
    const mockCmsData: BlogResponse = {
      contents: [
        {
          id: "microcms-id",
          createdAt: "20251111",
          title: "ブログ記事１",
          content: "ブログ内容",
        },
      ],
    };
     render(<Cms4BlogsPage cmsData={mockCmsData} />);
    expect(await screen.findByTestId("button")).toBeInTheDocument();
  });
});
