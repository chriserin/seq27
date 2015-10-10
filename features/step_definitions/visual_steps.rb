Then(/^I see a selected area from beat '(\d+)' to '(\d+)'$/) do |left, right|
  selection = find('visualSelection')
  expect(selection['data-left']).to eq((left.to_i * 96).to_s)
  expect(selection['data-right']).to eq((right.to_i * 96).to_s)
end

Then(/^I see a selected area from pitch '(\d+)' to '(\d+)'$/) do |top, bottom|
  selection = find('visualSelection')
  expect(selection['data-top']).to eq top
  expect(selection['data-bottom']).to eq bottom
end

Then(/^I see the note is part of the selected group$/) do
  expect(find('note.groupSelected')['data-pitch']).to eq '60'
end
