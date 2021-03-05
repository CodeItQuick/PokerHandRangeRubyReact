terraform {
  backend "remote" {
    organization = "PokerHandRangeOrg"

    workspaces {
      name = "production"
    }
  }
}