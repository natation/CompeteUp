class AddColorsToCompetitions < ActiveRecord::Migration
  def change
    add_column :competitions, :color1, :string, default: ""
    add_column :competitions, :color2, :string, default: ""
  end
end
