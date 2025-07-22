# Create an S3 bucket for Terraform remote state storage

resource "aws_s3_bucket" "terraform_state_bucket" {
  bucket = "sfjljw34-terraform-remote-state"
  force_destroy = true
  tags = {
    Name        = "Terraform State Bucket"
    Environment = "dev"
  }
  
}

resource "aws_s3_bucket_versioning" "terraform_state_bucket_versioning" {
  bucket = aws_s3_bucket.terraform_state_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "sse_config" {
    bucket = aws_s3_bucket.terraform_state_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "AES256"
    }
  }
}