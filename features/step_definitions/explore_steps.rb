Then(/^I see (\d+) sections and (\d+) parts$/) do |s, p|

  within 'explorer' do
    expect(page).to have_selector('songSection', count: s.to_i)
    expect(page).to have_selector('songSection part', count: p.to_i)
  end
end
