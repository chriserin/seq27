Given(/^a user$/) do
  create :user
end

Given(/^I am on the signin page$/) do
  visit signin_path
end

When(/^I provide credentials$/) do
  fill_in 'user_email', with: 'user@example.com'
  fill_in 'user_password', with: 'password'
  click_on 'Sign in'
end

Then(/^I see songs index page$/) do
  expect(current_path).to eq "/"
end
