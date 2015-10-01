Then(/^I see a 'Not an editor command' error$/) do
  within 'commandLine' do
    expect(page).to have_selector('span.error', text: 'E1: Not an editor command: something')
  end
end
