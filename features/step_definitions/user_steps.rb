Given /^a user with songs$/ do
  create :user, :with_songs
end

Given /^a user$/ do
  create :user
end

Given /^I am on the signin page$/ do
  visit signin_path
end

When /^I provide credentials$/ do
  fill_in 'user_email', with: 'user@example.com'
  fill_in 'user_password', with: 'password'
  click_on 'Sign in'
end

Then /^I see songs index page$/ do
  expect(current_path).to eq "/"
end

Then /^I see songs$/ do
  expect(page).to have_selector "section#songs article.song"
end

When /^I click a song$/ do
  song = Song.all.first
  click_link "song#{song.id}"
end

Then /^I am on the song page$/ do
  song = Song.all.first
  expect(current_path).to eq "/songs/#{song.id}"
end

Then /^I see a note$/ do
  expect(page).to have_selector("#song #grid note")
end
