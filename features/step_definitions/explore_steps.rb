Then(/^I see (\d+) sections and (\d+) parts$/) do |s, p|
  within 'explorer' do
    expect(page).to have_selector('songSection', count: s.to_i)
    expect(page).to have_selector('songSection part', count: p.to_i)
  end
end

Then(/^I see that explorer cursor is on arrangement index (\d+) part (\d+)$/) do |arrangementIndex, partId|
  selector = "songSection[data-arrangement-index='#{arrangementIndex}'] part[data-id='#{partId}']"
  partNode = find(selector)
  expect(partNode['class']).to include "cursor"
end

Then(/^I see that explorer cursor is on arrangement index (\d+)$/) do |arrangementIndex|
  selector = "songSection[data-arrangement-index='#{arrangementIndex}']"
  sectionNode = find(selector)
  expect(sectionNode['class']).to include "cursor"
end

Then(/^I do not see parts displayed in the explorer$/) do
  within 'explorer' do
    expect(page).to have_no_selector('songSection part')
  end
end

Then(/^I do see parts displayed in the explorer$/) do
  within 'explorer' do
    expect(page).to have_selector('songSection part')
  end
end

Then(/^I see that section (\d+) is displayed in the explorer first$/) do |arg1|
  within 'explorer' do
    firstSection = find("h1 + songSection")
    expect(firstSection['data-section-id']).to eq "2"
  end
end
