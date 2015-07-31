Given /^a user with songs$/ do
  create :user, :with_songs
end

Given /^a user with a new song$/ do
  create :user, :with_a_new_song
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
  expect(page).to have_selector("#songs")
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
  expect(page).to have_selector("songSection")
  expect(current_path).to eq "/songs/#{song.id}"
end

Then /^I see a note$/ do
  expect(page).to have_selector("#song notesGrid note")
end

Then /^I do not see a note$/ do
  expect(page).to_not have_selector("#song notesGrid note")
end

When(/^I raise an error$/) do
  page.evaluate_script("throwError();");
  page.evaluate_script("console.log('see this')");
end

Then(/^I see a message with file name and line number$/) do
  expect(get_logs_from_browser.first).to include "testing:4 Uncaught throwing test error"
end
