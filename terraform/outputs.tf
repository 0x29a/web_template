output "private_key" {
  value     = tls_private_key.ssh.private_key_openssh
  sensitive = true
}

output "server_ip" {
  value = digitalocean_droplet.application.ipv6_address
}

output "ansible_inventory" {
  value     = <<-EOT
    [application]
    ${digitalocean_droplet.application.ipv6_address} ansible_ssh_user=ubuntu ansible_port=4444 ansible_python_interpreter=/usr/bin/python3

    [all:vars]
    ansible_ssh_private_key_file=private_key
  EOT
  sensitive = true
}

output "ansible_variables" {
  value     = <<-EOT
    app_name: ${var.app_name}
    deploy_token_username: ${gitlab_deploy_token.default.username}
    deploy_token_password: ${gitlab_deploy_token.default.token}
    repo_url: https://${gitlab_deploy_token.default.username}:${gitlab_deploy_token.default.token}@gitlab.com/${var.gitlab_project}.git
  EOT
  sensitive = true
}
