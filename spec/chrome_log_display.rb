module ChromeLogDisplay
  def display_logs
    browser_messages = page.driver.getLog(:browser)
    puts browser_messages.reject {|x| x =~ /Download the React DevTools/}
  end
end
