Then(/^I see a cursor$/) do
  expect(cursor).to have_a_position_of(0, 0)
end

When /^I press the space bar$/ do
  page.execute_script("EVENT_TRIGGERS.downKey(' ')")
end

When(/^I press '(\w)'$/) do |char|
  page.execute_script("EVENT_TRIGGERS.downKey('#{char}')")
end

Then /^I see the cursor has moved (down|up|right|left)$/ do |direction|
  positions = {
    down: {start: 0, pitch: 1},
    up: {start: 0, pitch: 0},
    right: {start: 1, pitch: 0},
    left: {start: 0, pitch: 0}
  }

  position = positions[direction.to_sym]
  expect(cursor).to have_a_position_of(position[:start], position[:pitch])
end

Then /^I see that the cursor has not moved$/ do
  expect(cursor).to have_a_position_of(0, 0)
end

Then(/^I see a new note$/) do
  expect(page).to have_selector("note", count: 2)
  expect(cursor).to have_a_position_of(0, 1)
end

Then(/^I see the cursor is at middle c$/) do
  expect(cursor).to have_a_position_of(0, 60)
end
