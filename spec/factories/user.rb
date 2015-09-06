FactoryGirl.define do
  factory :user do
    email "user@example.com"
    password "password"

    trait :with_songs do
       songs { build_list :song, 1}
    end
  end
end
