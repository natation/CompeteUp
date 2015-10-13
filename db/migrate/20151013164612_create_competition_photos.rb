class CreateCompetitionPhotos < ActiveRecord::Migration
  def change
    create_table :competition_photos do |t|
      t.string :url, null: false
      t.integer :competition_id, null: false
      t.timestamps null: false
    end
    add_index :competition_photos, :competition_id
  end
end
