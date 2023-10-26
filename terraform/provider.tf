terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
    gitlab = {
      source  = "gitlabhq/gitlab"
      version = "~> 16.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

provider "gitlab" {
  token = var.gitlab_token
}
