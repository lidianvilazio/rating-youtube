class CreateEmotions < ActiveRecord::Migration[5.1]
  def change
    create_table :emotions do |t|
      t.integer :user_id
      t.integer :video_id
      t.string :emotion

      t.timestamps
    end
  end
end
