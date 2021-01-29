const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR!!");
        console.log(err);
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        default: 'Cycling'
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

// productSchema.methods.greet = function () {
//     console.log('Hello! HowdY!');
//     console.log(`- from ${this.name}`);
// }

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Cycling Jersey' })
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
}
findProduct();

// const bike = new Product({ name: 'Tire Pump', price: 10.50, categories: ['Cycling']})
// bike.save()
//     .then(data => {
//         console.log("IT WORKED");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR");
//         console.log(err);
//     })

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -9.99 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("IT WORKED");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR");
//         console.log(err);
//     })