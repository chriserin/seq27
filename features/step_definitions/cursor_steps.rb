Then(/^I see a cursor in the top left corner$/) do
  expect(cursor).to have_a_position_of(0, 127)
end

When /^I press the space bar$/ do
  GC.disable
  page.execute_script("EVENT_TRIGGERS.downKey(' ')")
end

When(/^I press '(\w)'$/) do |char|
  expect(page).to have_selector('songSection')
  page.execute_script("EVENT_TRIGGERS.downKey('#{char}')")
end

Then /^I see the cursor has moved (down|up|right|left)$/ do |direction|
  positions = {
    down: {start: 0, pitch: 126},
    up: {start: 0, pitch: 127},
    right: {start: 96, pitch: 127},
    left: {start: 0, pitch: 127}
  }

  position = positions[direction.to_sym]
  expect(cursor).to have_a_position_of(position[:start], position[:pitch])
end

Then /^I see that the cursor has not moved$/ do
  expect(cursor).to have_a_position_of(0, 0)
end

Then(/^I see a new note$/) do
  expect(page).to have_selector("note[data-start='0'][data-pitch='126']")
end

Then(/^I see a note with length "(.*?)"$/) do |length|
  note = page.find('note')
  expect(note['data-length']).to eq length
end

Then(/^I see "(\d*)" notes with length "(.*?)"$/) do |note_count, length|
  selector = "note[data-length='#{length}']"
  expect(page).to have_selector(selector, count: note_count.to_i)
end

Then(/^I see a new note with pitch "(\d*)"$/) do |pitch|
  expect(page).to have_selector("note[data-pitch='#{pitch}']")
end

Then(/^I see the cursor is at middle c$/) do
  expect(cursor).to have_a_position_of(0, 60)
end

Then(/^I see the cursor is at middle d$/) do
  expect(cursor).to have_a_position_of(0, 62)
end

When(/^I type a sequence then I see the cursor at the right pitch:$/) do |table|
  table.hashes.each do |row|
    type(row[:sequence])
    expect(cursor).to have_a_position_of(0, row[:midipitch])
  end
end
