class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.text :description, null: false
      t.integer :competition_id, null: false
      t.timestamps null: false
    end
    add_index :events, :competition_id
  end
end
