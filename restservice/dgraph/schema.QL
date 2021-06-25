type User {
  username: String! @id @search(by: [hash])
  password: String! @search(by: [hash])
  first_name: String! @search(by: [exact])
  last_name: String! @search(by: [exact])
  job_title: String! @search(by: [fulltext])
  address: String @search(by: [fulltext])
  phone_number: String! @search(by: [exact])
  email_address: String! @search(by: [exact])
}
type Organization {
    organizationID: ID!
    name: String! @search(by: [exact])
    address: String @search(by: [fulltext])
    phone_number: String @search(by: [exact])
  	members:[User]
  	owners: [User]
}




#Mutation
{
  "set": [
    {
      "name": "Expert Collective Coop",
      "address": "Boston, Mass",
      "phoneNumber": "4699393844",
      "owners": [
        {
          "username": "Abraham",
          "password": "asdf",
          "firstName": "Abraham",
          "lastName": "French",
          "jobTitle": "Owner",
          "organization": "Expert Collective Coop",
          "address": "Dallas, TX, USA",
          "phoneNumber": "4699393844",
          "emailAddress": "abraham@expertcollective.com"
        },
        {
          "username": "Dave",
          "password": "asdf",
          "firstName": "Dave",
          "lastName": "Brinovec",
          "jobTitle": "Owner",
          "organization": "Expert Collective",
          "address": "Brook Park, OH, USA",
          "phoneNumber": "2165716598",
          "emailAddress": "dave@expertcollective.com"
        }
      ],
      "workers": [
        {
          "username": "Abraham",
          "password": "asdf",
          "firstName": "Abraham",
          "lastName": "French",
          "jobTitle": "Software Developer",
          "organization": "Expert Collective Coop",
          "address": "Dallas, TX, USA",
          "phoneNumber": "4699393844",
          "emailAddress": "abraham@expertcollective.com"
        },
        {
          "username": "Dave",
          "password": "asdf",
          "firstName": "Dave",
          "lastName": "Brinovec",
          "jobTitle": "IT Administrator",
          "organization": "Expert Collective",
          "address": "Brook Park, OH, USA",
          "phoneNumber": "2165716598",
          "emailAddress": "dave@expertcollective.com"
        }
      ]
    }
  ]
}

#Query
{
  organization(func: has(workers)) {
		name
    address
    owners
    workers {
			username
    }
  }
}