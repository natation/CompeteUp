class RemoveUsernameFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :username
    add_column :users, :name, :string
  end
end
