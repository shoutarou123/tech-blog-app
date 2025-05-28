class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :date
      t.string :url
      t.string :thumbnail

      t.timestamps
    end
  end
end
