class Api::V2::ItemsController < ApplicationController
  def index
    conn = Faraday.new(
      url: 'https://qiita.com',
      headers: {'Content-Type' => 'application/json'}
    )
    response = conn.get('/api/v2/items', {query: 'user:taurosuke', per_page: 4}) do
    end
    render json: JSON.parse(response.body)
  end

  def all
    conn = Faraday.new(
      url: 'https://qiita.com',
      headers: {'Content-Type' => 'application/json'}
    )
    response = conn.get('/api/v2/items', {query: 'user:taurosuke', per_page: 100}) do
    end
    render json: JSON.parse(response.body)
  end
end
