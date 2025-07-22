# Terraform

### Init 

```bash
terraform init
```

### Create S3 bucket to store state

create file `2.s3.tf`

```bash
terraform plan -out=tfplan
terraform apply tfplan
``` 

### Migrate state to S3

create `3.backend.tf`

```terraform
terraform {
  backend "s3" {
    bucket = "sfjljw34-terraform-remote-state"
    key    = "terraform.tfstate"
    region = "us-east-1"
    use_lockfile = true
    encrypt = true
    }
}
```

```bash
terraform init -migrate-state
```

### Destroy resources incluse s3 that contains remote state

edit `3.backend.tf`

```terraform
terraform {
}
```

migrate state from s3 to local

```bash
terraform init -migrate-state
```

```bash
terraform destroy
```
