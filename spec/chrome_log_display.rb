module ChromeLogDisplay
  def get_logs_from_browser
    browser_messages = page.driver.getLog(:browser)
    filtered_messages = browser_messages.reject {|x| x.fetch("message") =~ /Download the React DevTools/}
    filtered_messages.map { |m| format_message(m); }
  end

  def display_logs
    get_logs_from_browser.each { |m| puts m }
  end

  def format_message(m)
    file, line_no, content = parse_message_content(m.fetch("message"))
    if m.fetch("level") == "SEVERE"
      "ERROR: #{file}:#{line_no} #{content}"
    else
      "LOG: #{content}"
    end
  end

  def parse_message_content(content)
    match = /assets\/(.*).self\.js.*\s(\d*):(\d*)\s(.*)/.match(content)
    if match
      return match[1], match[2], match[4]
    else
      return "", "", ""
    end
  end
end
