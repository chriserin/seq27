#!/usr/bin/ruby

SSH_KEY_FINGERPRINT = '8c:36:e3:90:bc:05:92:4f:79:51:28:e2:a8:5c:23:39'

require 'droplet_kit'
token=File.read('tmp/digital_ocean.token')
puts "TOKEN: #{token}"
client = DropletKit::Client.new(access_token: token)

droplet = DropletKit::Droplet.new(
  name: 'seq27.com',
  region: 'nyc2',
  size: '512mb',
  image: 'ubuntu-14-04-x64',
  ssh_keys: [SSH_KEY_FINGERPRINT]
)

puts 'creating droplet'
client.droplets.create(droplet)

puts 'finding new droplet'
droplet = client.droplets.find(id: droplet.id)
until droplet.status == 'active' do
  sleep 10
  puts 'finding active droplet'
  droplet = client.droplets.find(id: droplet.id)
end

inventory_file_name = "tmp/do_inventory_#{droplet.public_ip}"
puts "inventory file: #{inventory_file_name}"
File.write(inventory_file_name, "[web]\n#{droplet.public_ip}\n\n[production:children]\nweb")

puts "running ansible: user"
system "ansible-playbook -i #{inventory_file_name} ansible/user.yml -vv"
puts "******************** deploy key"
puts system "ssh root@#{droplet.public_ip} 'cat /home/chriserin/.ssh/id_rsa.pub'"
puts "********************"

puts "running ansible: bootstrap"
system "ansible-playbook -i #{inventory_file_name} ansible/bootstrap.yml -vv"

puts "running ansible: deploy"
system "ansible-playbook -i #{inventory_file_name} ansible/deploy.yml -vv"

puts "assigning floating ip"
client.floating_ip_actions.assign(ip: '45.55.100.219', droplet_id: droplet.id)
