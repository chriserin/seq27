class AddDefinitionToSong < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table songs add column definition jsonb;
    SQL
  end

  def down
    execute <<-SQL
      alter table songs drop column definition;
    SQL
  end
end
