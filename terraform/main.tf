resource "tls_private_key" "ssh" {
  algorithm = "ED25519"
}

resource "digitalocean_ssh_key" "default" {
  name       = "web_template key"
  public_key = tls_private_key.ssh.public_key_openssh
}

resource "digitalocean_droplet" "web_template" {
  image         = "ubuntu-22-04-x64"
  name          = "web-template"
  region        = "fra1"
  size          = "s-1vcpu-512mb-10gb"
  ipv6          = true
  monitoring    = true
  droplet_agent = true
  ssh_keys      = [digitalocean_ssh_key.default.id]
}

resource "digitalocean_firewall" "web" {
  name = "only-22-80-and-443"

  droplet_ids = [digitalocean_droplet.web_template.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
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
    protocol = "tcp"
    port_range = "all"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "udp"
    port_range = "all"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}
