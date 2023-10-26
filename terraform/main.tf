resource "tls_private_key" "ssh" {
  algorithm = "ED25519"
}

resource "digitalocean_ssh_key" "default" {
  name       = "web_template key"
  public_key = tls_private_key.ssh.public_key_openssh
}

data "template_file" "cloud-init-yaml" {
  template = file("cloud-init.yml")
  vars = {
    init_ssh_public_key = tls_private_key.ssh.public_key_openssh
  }
}

resource "digitalocean_droplet" "application" {
  image         = "ubuntu-22-04-x64"
  name          = "web-template"
  region        = "ams3"
  size          = "s-1vcpu-1gb"
  ipv6          = true
  monitoring    = true
  droplet_agent = false
  ssh_keys      = [digitalocean_ssh_key.default.id]
  user_data     = data.template_file.cloud-init-yaml.rendered
}

resource "digitalocean_firewall" "application" {
  name = "only-22-80-443-and-icmp"

  droplet_ids = [digitalocean_droplet.application.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "4444"
    source_addresses = ["::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "icmp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "all"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "all"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}
