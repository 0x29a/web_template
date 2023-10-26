resource "gitlab_deploy_token" "default" {
  project = var.gitlab_project
  name    = "${var.app_name}-token"
  scopes  = ["read_repository", "read_registry"]
}
