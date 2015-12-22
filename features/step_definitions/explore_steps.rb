Then(/^I see (\d+) sections and (\d+) parts$/) do |s, p|
  within 'div.explorer' do
    expect(page).to have_selector('li.section', count: s.to_i)
    expect(page).to have_selector('li.section li.part', count: p.to_i)
  end
end

Then(/^I see that explorer cursor is on arrangement index (\d+) part (\d+)$/) do |arrangementIndex, partId|
  selector = "songSection[data-arrangement-index='#{arrangementIndex}'] part[data-id='#{partId}']"
  partNode = find(selector)
  expect(partNode['class']).to include "cursor"
end

Then(/^I see that explorer cursor is on arrangement index (\d+)$/) do |arrangementIndex|
  within 'div.explorer' do
    selector = "li.section:nth-child(1) li.part:nth-child(2)"
    sectionNode = find(selector)
    expect(sectionNode['class']).to include "selected"
  end
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
