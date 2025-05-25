class HelloController < ApplicationController
  def index
    render json: { message: "こんにちは" }
  end
end
