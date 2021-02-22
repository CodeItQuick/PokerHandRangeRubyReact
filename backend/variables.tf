variable "region" {
  description = "Region that the instances will be created"
}

/*====
environment specific variables
======*/

variable "database_name" {
  description = "The database name for Production"
}

variable "database_username" {
  description = "The username for the Production database"
}

variable "database_password" {
  description = "The user password for the Production database"
}

variable "secret_key_base" {
  description = "The Rails secret key for production"
}

variable "domain" {
  default = "The domain of your application"
}

variable "rabbit_name" {
	description = "A random environment"
}

variable "environment" {
	description = "Environment for the application"
}

variable "availability_zones" {
	type = "list"
}