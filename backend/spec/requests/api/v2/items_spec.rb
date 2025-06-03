require 'rails_helper'

RSpec.describe "Api::V2::Items", type: :request do
  describe "GET /index" do
    it "Qiita APIから記事を4つ取得してJSONを返す" do
      stub_request(:get, "https://qiita.com/api/v2/items?per_page=4&query=user:taurosuke")
      .to_return(status: 200, body: Array.new(4) { |i| { title: "sample#{i+1}"}}.to_json, headers: {
        'Content-Type' => 'application/json'})

      get "/api/v2/items"
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).length).to eq(4)
    end
  end

  describe "GET /all" do
    it "Qiita APIから記事を100個取得してJSONを返す" do
      stub_request(:get, "https://qiita.com/api/v2/items?per_page=100&query=user:taurosuke")
      .to_return(status: 200, body: Array.new(100) { |i| { title: "sample#{i+1}"}}.to_json, headers: {
        'Content-Type' => 'application/json'})

        get "/api/v2/items/all"
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body).length).to eq(100)
    end
  end
end
