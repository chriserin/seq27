Then(/^I see a 'Not an editor command' error$/) do
  within 'commandLine' do
    expect(page).to have_selector('span.error', text: 'E1: Not an editor command: something')
  end
end

Then(/^I see an "([^"]*)" error$/) do |error_identifier|
  within 'commandLine' do
    expect(page).to have_selector('span.error', text: error_identifier)
  end
end

Then(/^I see a command "([^"]*)" at the command line$/) do |arg1|
  input = find("#commandLineInput")
  expect(input.value).to eq arg1
end

Then(/^I see that sect (\d+) is active$/) do |sectionNumber|
  within 'statusline' do
    expect(page).to have_selector(".section", text: "sect #{sectionNumber}")
  end
end

Then(/^I see that sect (\d+) is active$/) do |sectionNumber|
  within 'statusline' do
    expect(page).to have_selector(".section", text: "sect #{sectionNumber}")
  end
end

Then(/^I see that the output "([^"]*)" is selected$/) do |outputName|
  within 'statusline' do
    expect(page).to have_selector("div", text: "output #{outputName}")
  end
end

Then(/^I see that the current channel is "(\d+)"$/) do |channel|
  within 'statusline' do
    expect(page).to have_selector("div", text: "channel #{channel}")
  end
end
