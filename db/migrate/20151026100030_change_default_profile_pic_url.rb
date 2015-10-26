class ChangeDefaultProfilePicUrl < ActiveRecord::Migration
  def change
    change_column_default :users, :profile_pic_url, "blank_profile_qqetgr"
    change_column_default :competitions, :profile_pic_url, "blank_competition_profile_nrea8m"
  end
end
