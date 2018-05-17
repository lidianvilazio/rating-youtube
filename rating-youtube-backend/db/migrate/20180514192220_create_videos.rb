class CreateVideos < ActiveRecord::Migration[5.1]
  def change
    create_table :videos do |t|
      t.string :VideoId
      
      t.timestamps
    end
  end
end
