import Cart from "../models/cart.js";
// helper function 
async function findUserCart(userid) { 
    try { 
const foundCart = await Cart.findOne({customer: userid}).exec()
if (foundCart) { 
    return foundCart
} else { 
   const createdCart = await Cart.create({ 
    customer: userid, 
    items: []
   })
   return createdCart
}
    } catch(err) { 
        console.log(err)
    }   
}

async function getCart(req, res) { 
    try { 
        const cart = await Cart.findOne({customer: req.params.id}).populate('items').exec()
        res.status(201).json({ cart });
    }catch(err) {
        console.log(err)
    }
}

async function addToCart(req, res) { 
    try { 
        const cart = await findUserCart(req.user._id)
    cart.items.push(req.body.id)
    cart.save()
    const endCart = await cart.populate('items')
    res.status(201).json({ endCart });
    } catch(err) { 
        console.log(err)
    }   
}

async function removeItem(req, res) { 
    try { 
        const cart = await findUserCart(req.user._id)
        const index = cart.items.indexOf(req.params.id)
        cart.items.splice(index, 1)
        cart.save()
    } catch(err) { 
        console.log(err)
    }
}

async function emptyCart(req, res) { 
    try { 
        console.log("cartctrl hit")
        const cart = await Cart.findById(req.params.id)
        console.log(cart, "before")
        const empty = []
        cart.updateOne({items: empty}, function (err, result) { 
            if (err) { 
                console.log(err)
            } else { 
                console.log(result)
                cart.save()
            }
        })
        
        console.log(cart)
    }catch(err) { 
        console.log(err)
    }
}
export default {addToCart, getCart, removeItem, emptyCart};
