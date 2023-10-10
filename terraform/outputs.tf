output "private_key" {
  value     = tls_private_key.ssh.private_key_openssh
  sensitive = true
}

output "server_ip" {
  value = digitalocean_droplet.web_template.ipv6_address
}

output "ansible_inventory" {
  value     = <<-EOT
    [web_template]
    ${digitalocean_droplet.web_template.ipv6_address} ansible_ssh_user=ubuntu ansible_port=4444 ansible_python_interpreter=/usr/bin/python3

    [all:vars]
    ansible_ssh_private_key_file=private_key
  EOT
  sensitive = true
}

output "ansible_variables" {
  value = <<-EOT
    username: web_template
  EOT
  sensitive = true
}
