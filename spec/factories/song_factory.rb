FactoryGirl.define do
  factory :song do
    definition <<-SONG
      { "tempo": 60, "arrangement": [0], "sections": [{"loop": 1, "parts": [{"beats": 4, "notes": []}]}]}
    SONG
  end
end
