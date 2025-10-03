resource "aws_ecr_repository" "backend" {
  name = "elearn-backend"
}

resource "aws_ecr_repository" "frontend" {
  name = "elearn-frontend"
}
