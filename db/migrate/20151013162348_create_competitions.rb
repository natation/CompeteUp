class CreateCompetitions < ActiveRecord::Migration
  def change
    create_table :competitions do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.text :description, null: false
      t.string :profile_pic_url
      t.integer :competition_owner_id, null: false
      t.timestamps null: false
    end
    add_index :competitions, :competition_owner_id
  end
end
