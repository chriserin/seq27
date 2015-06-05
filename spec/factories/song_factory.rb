FactoryGirl.define do
  factory :song do
    name "SongA"
    definition '{"song": {"notes": [{"pitch": 64, "start": 0, "length": 96}], "tempo": 60}}'

    trait :with_two_notes do
      definition '{"song": {"notes": [{"pitch": 64, "start": 0, "length": 96}, {"pitch": 64, "start": 96, "length": 96}], "tempo": 60}}'
    end
  end
end
