Then(/^I see a cursor$/) do
  expect(page).to have_selector("#song cursorGrid cursor")
  expect(page).to have_selector("cursor[data-beat='0'][data-pitch='0']")
end

When(/^I press '(\w)'$/) do |char|
  page.execute_script("EVENT_TRIGGERS.downKey('#{char}')")
end

Then /^I see the cursor has moved (down|up|right|left)$/ do |direction|
  positions = {
    down: {beat: 0, pitch: 1},
    up: {beat: 0, pitch: 0},
    right: {beat: 1, pitch: 0},
    left: {beat: 0, pitch: 0}
  }

  position = positions[direction.to_sym]
  expect(page).to have_selector("cursor[data-beat='#{position[:beat]}'][data-pitch='#{position[:pitch]}']")
end

Then /^I see that the cursor has not moved$/ do
  expect(page).to have_selector("cursor[data-beat='0'][data-pitch='0']")
end

Then(/^I see a new note$/) do
  expect(page).to have_selector("note", count: 2)
  expect(page).to have_selector("note[data-beat='0'][data-pitch='1']")
end
