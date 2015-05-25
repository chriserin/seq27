module ChromeLogDisplay
  def display_logs
    browser_messages = page.driver.getLog(:browser)
    filtered_messages = browser_messages.reject {|x| x =~ /Download the React DevTools/}
    filtered_messages.each { |m| puts m; }
  end
end
