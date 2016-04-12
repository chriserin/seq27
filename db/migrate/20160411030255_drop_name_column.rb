class DropNameColumn < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table songs drop column name;
    SQL
  end

  def down
    execute <<-SQL
      alter table songs add column name text;
    SQL
  end
end
