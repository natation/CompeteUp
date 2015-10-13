class CreateUserInterests < ActiveRecord::Migration
  def change
    create_table :user_interests do |t|
      t.integer :user_id, null: false
      t.integer :interest_id, null: false
      t.timestamps null: false
    end
    add_index :user_interests, [:user_id, :interest_id], unique: true
    add_index :user_interests, :interest_id
  end
end
