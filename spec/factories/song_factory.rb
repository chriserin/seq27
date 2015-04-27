FactoryGirl.define do
  factory :song do
    name "SongA"
    definition '{"song": {"notes": [{"pitch": 64, "ticks": 96}]}}'
  end
end
