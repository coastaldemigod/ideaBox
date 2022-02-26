// The dummy data is being used only for testing & development purposes
// Thus it hasn't been id-ed yet.
// Later on the database would be shifted to mongoDB, where it will be id-ed and processed accordingly.

const userData=[
    {
        name:"some random name",
        email:'test1@test.com',
        password:"very_strong",
        ideas:[
            {
                name:'some name1',
                domain:'some domain', 
                idea:'some basic description about some very good idea or a really great project.',
            },
            {
                name:'some name2',
                domain:'some domain',
                idea:'some basic description about some very good idea or a really great project.',
            }
        ]
    },
    {
        name:"some random name",
        email:'test2@test.com',
        password:"very_strong",
        ideas:[
            {
                name:'some name3',
                domain:'some domain',
                idea:'some basic description about some very good idea or a really great project.',
            },
            {
                name:'some name4',
                domain:'some domain',
                idea:'some basic description about some very good idea or a really great project.',
            }
        ]
    }
]

module.exports = userData;