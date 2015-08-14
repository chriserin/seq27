Then(/^I see (\d+) sections$/) do |n|

  within 'explorer' do
    expect(page).to have_selector('songSection', count: n.to_i)
  end
end
