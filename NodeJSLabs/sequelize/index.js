const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

const app = express()

/**
 * prepare the request body, to receive the json format
 */
 app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')
app.use(express.static('public'))

app.get('/users/create', (req,res)=>{
    res.render('adduser')
})

app.get('/',  (req,res)=>{
    res.render('home')
}
)

app.get('/users/get/:id', async (req,res)=>{
    const id = req.params.id
    const user = await User.findOne({include: Address, where:{id:id}})
    res.render('user',{user: user.get({plain:true})})
}
)

app.get('/users/edit/:id', async (req,res)=>{
    const id = req.params.id
    const user = await User.findOne({include: Address, where:{id:id}})
    res.render('edituser',{user: user.get({plain:true})})
}
)

app.post('/users/update', async (req,res)=>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on')
    {
        newsletter = true
    }else{
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    const user = await User.update(userData,{where:{id:id}})
    res.redirect(`/users/get/${id}`)
}
)
app.post('/users/delete', async (req,res)=>{
    const id = req.body.id
    const user = await User.destroy({raw: true, where:{id:id}})
    res.redirect('/users/get')
}
)

app.get('/users/get', async (req,res)=>{
    const users = await User.findAll({raw: true})
    res.render('users', {users, users})
}
)

app.post('/users/create', async (req,res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    await User.create({ name,occupation, newsletter})
    console.log(req.body)
    res.redirect('/users/get')

})

app.get('/address/add/:id',  (req,res)=>{
    const UserId =  req.params.id
    console.log(UserId)
    res.render('addaddress',{UserId})
})

app.post('/address/create', async (req,res)=>{
    const UserId = req.body.UserId
    const city = req.body.city
    const street = req.body.street
    const number = req.body.number

    const AddressTemp = {
        UserId,
        city,
        street,
        number
    }
    await Address.create(AddressTemp)
    console.log(req.body)
    res.redirect(`/users/get/${UserId}`)
})

app.post('/address/edit', async (req,res)=>{
    const id = req.body.id
    const address = await Address.findOne({raw: true, where:{id:id}})
    res.render('editaddress',{address,address})
}
)
app.post('/address/update', async (req,res)=>{
    const id = req.body.id
    const UserId = req.body.UserId
    const city = req.body.city
    const street = req.body.street
    const number = req.body.number

    const addressData = {
        UserId,
        city,
        street,
        number
    }
    const address = await Address.update(addressData,{where:{id:id}})
    res.redirect(`/users/get/${UserId}`)
}
)

app.post('/address/delete', async (req,res)=>{
    const id = req.body.id
    const UserId = req.body.UserId
    const address = await Address.destroy({raw: true, where:{id:id}})
    res.redirect(`/users/get/${UserId}`)
}
)

/*conn.sync({force:true})
* this option, force the drop table and create again.
*/
conn.sync()
.then(()=>{
    app.listen(3000)
    console.log('listen port 3000')
}).catch((err)=>{
    console.log(err)
})

