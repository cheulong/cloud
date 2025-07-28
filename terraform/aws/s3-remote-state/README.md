# Terraform

### Create S3 bucket to store state

```bash
cd tf-backend
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

### Create terraform project

```bash
cd aws-host-website
terraform init
terraform plan -out=tfplan
terraform apply tfplan
``` 
