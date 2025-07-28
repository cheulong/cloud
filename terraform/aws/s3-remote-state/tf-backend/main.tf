terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

# Configure the Random Provider
resource "random_string" "suffix" {
  length  = 6
  special = false
  lower = true
  upper = false
  numeric = true
}

# Create an S3 bucket for Terraform remote state storage
resource "aws_s3_bucket" "terraform_state_bucket" {
  bucket        = "cheulong-devops-terraform-state-${random_string.suffix.result}"
  force_destroy = true
  tags = {
    Name = "Terraform State Bucket"
  }
}


resource "aws_s3_bucket_versioning" "terraform_state_bucket_versioning" {
  bucket = aws_s3_bucket.terraform_state_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_bucket_encryption" {
  bucket = aws_s3_bucket.terraform_state_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "terraform_state_bucket_lifecycle" {
  bucket = aws_s3_bucket.terraform_state_bucket.id

  rule {
    id     = "delete-old-versions"
    status = "Enabled"
    filter {}

    noncurrent_version_expiration {
      noncurrent_days = 30
    }
  }
}