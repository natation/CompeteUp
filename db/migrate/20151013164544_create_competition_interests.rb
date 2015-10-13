class CreateCompetitionInterests < ActiveRecord::Migration
  def change
    create_table :competition_interests do |t|
      t.integer :competition_id, null: false
      t.integer :interest_id, null: false
      t.timestamps null: false
    end
    add_index :competition_interests, [:competition_id, :interest_id], unique: true
    add_index :competition_interests, :interest_id
  end
end
