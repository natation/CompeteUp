class AddColorsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :color1, :string, default: ""
    add_column :users, :color2, :string, default: ""
  end
end
