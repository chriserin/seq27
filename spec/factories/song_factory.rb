FactoryGirl.define do
  factory :song do
    name "SongA"
    definition <<-SONG
    { "song": { "beats": 4, "tempo": 60, "sections": [{"loop": 1, "parts": [{"notes": [{"pitch": 64, "start": 0, "length": 96}]}]}]}}
    SONG

    trait :with_two_notes do
      definition '{"song": {"beats": 4, "tempo": 60, "sections": [{"loop": 1, "parts": [{"notes": [{"pitch": 64, "start": 0, "length": 96}, {"pitch": 64, "start": 96, "length": 96}]}]}]}}'
    end

    trait :with_two_sections do
      definition '{"song": {"beats": 4, "tempo": 60, "sections": [{"loop": 1, "parts": [{"notes": [{"pitch": 64, "start": 0, "length": 96}]}]},{"loop": 1, "parts": [{"notes": [{"pitch": 64, "start": 0, "length": 96}]}]}]}}'
    end
  end
end
