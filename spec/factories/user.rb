FactoryGirl.define do
  factory :user do
    email "user@example.com"
    password "password"

    trait :with_songs do
       songs { build_list :song, 1}
    end

    trait :with_a_song_with_two_notes do
       songs { build_list :song, 1, :with_two_notes}
    end

    trait :with_a_song_with_two_sections do
       songs { build_list :song, 1, :with_two_sections}
    end
  end
end
