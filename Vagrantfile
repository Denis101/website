# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.manage_guest = true
  config.hostmanager.ignore_private_ip = false
  config.hostmanager.include_offline = true

  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/trusty64"
    web.vm.hostname = "deniscraig.dev"
    web.vm.network :private_network, ip: "192.168.52.21"
    web.vm.network :forwarded_port, guest: 80, host: 8080
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "infra/setup.yml"
  end
end
