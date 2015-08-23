Then(/^I see (\d+) sections and (\d+) parts$/) do |s, p|
  within 'explorer' do
    expect(page).to have_selector('songSection', count: s.to_i)
    expect(page).to have_selector('songSection part', count: p.to_i)
  end
end

Then(/^I see that explorer cursor is on section (\d+) part (\d+)$/) do |arg1, arg2|
  a = arg1
  b = arg2
  selector = "songSection[data-id='#{a}'] part[data-id='#{b}']"
  partNode = find(selector)
  expect(partNode['class']).to include "cursor"
end
