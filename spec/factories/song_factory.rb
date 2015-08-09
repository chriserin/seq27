FactoryGirl.define do
  factory :song do
    name "SongA"
    definition <<-SONG
    { "song": { "tempo": 60, "sections": [{"loop": 1, "parts": [{"beats": 4, "notes": [{"pitch": 64, "start": 0, "length": 96}]}]}]}}
    SONG

    trait :with_no_notes do
      definition '{"song": {"tempo": 60, "sections": [{"loop": 1, "parts": [{"beats": 4, "notes": []}]}]}}'
    end

    trait :with_two_notes do
      definition '{"song": {"tempo": 60, "sections": [{"loop": 1, "parts": [{"beats": 4, "notes": [{"pitch": 64, "start": 0, "length": 96}, {"pitch": 64, "start": 96, "length": 96}]}]}]}}'
    end

    trait :with_two_sections do
      definition '{"song": {"tempo": 60, "sections": [{"loop": 1, "parts": [{"beats": 4, "notes": [{"pitch": 64, "start": 0, "length": 96}]}]},{"loop": 1, "parts": [{"beats": 4, "notes": [{"pitch": 64, "start": 0, "length": 96}]}]}]}}'
    end
  end
end
