FactoryGirl.define do
  factory :song do
    name "SongA"
    definition <<-SONG
    { "song": { "loop": 1, "beats": 4, "tempo": 60, "sections": [{"parts": [{"notes": [{"pitch": 64, "start": 0, "length": 96}]}]}]}}
    SONG

    trait :with_two_notes do
      definition '{"song": {"loop": 1, "beats": 4, "tempo": 60, "sections": [{"parts": [{"notes": [{"pitch": 64, "start": 0, "length": 96}, {"pitch": 64, "start": 96, "length": 96}]}]}]}}'
    end

    trait :with_two_sections do
      definition '{"song": {"loop": 1, "beats": 4, "tempo": 60, "sections": [{"parts": [{"notes": [{"pitch": 64, "start": 0, "length": 96}]}]},{"parts": [{"notes": [{"pitch": 64, "start": 0, "length": 96}]}]}]}}'
    end
  end
end
