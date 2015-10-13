class CreateUserCompetitions < ActiveRecord::Migration
  def change
    create_table :user_competitions do |t|
      t.integer :user_id, null: false
      t.integer :competition_id, null: false
      t.timestamps null: false
    end
    add_index :user_competitions, [:user_id, :competition_id], unique: true
    add_index :user_competitions, :competition_id
  end
end
