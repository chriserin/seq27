Then(/^I see (\d+) sections and (\d+) parts$/) do |s, p|
  within 'explorer' do
    expect(page).to have_selector('songSection', count: s.to_i)
    expect(page).to have_selector('songSection part', count: p.to_i)
  end
end

Then(/^I see that explorer cursor is on section (\d+) part (\d+)$/) do |sectionId, partId|
  selector = "songSection[data-id='#{sectionId}'] part[data-id='#{partId}']"
  partNode = find(selector)
  expect(partNode['class']).to include "cursor"
end

Then(/^I see that explorer cursor is on section (\d+)$/) do |sectionId|
  selector = "songSection[data-id='#{sectionId}']"
  sectionNode = find(selector)
  expect(sectionNode['class']).to include "cursor"
end
