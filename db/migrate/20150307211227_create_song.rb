class CreateSong < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table songs (
        id integer primary key,
        name text,
        user_id integer references users(id)
      );
    SQL
  end

  def down
    execute <<-SQL
      drop table songs;
    SQL
  end
end
