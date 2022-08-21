const product = require("../model/store")

const getproductstatic = async(req, res)=>{
       // throw new Error("testing async error");
       const products = await product.find({price:{$gt:20}&&{$lt:30}})
    //    .sort("name -price")
       .select("name price")
    //    .limit(10)
       res.status(201).json({Product:products, nbHits:products.length})
}

const getproducts =  async(req, res)=>{
    // throw new Error("testing async error");
    console.log(req.query)
    const {featured, company, name, sort, field, numericFilters} =req.query
    const Newquery = {}
    if(featured){
        Newquery.featured = featured === "true" ? true : false
    }
    if(company){
        Newquery.company = company
    }
    if(name){
        Newquery.name = {$regex: name, $options:"i"}
    }
    if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            "<":"$lt",
            ">=":"$gte",
            "<=":"$lte",
            "=":"$eq"
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;

        // let Filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        let Filters = numericFilters.replace(regEx, (match)=>{ return "-"+operatorMap[match]+'-'})
        console.log(Filters)
        const options = ['price', 'rating']
        Filters = Filters.split(",").forEach((item)=>{
            const[fields, operator, value] = item.split("-")
            console.log(value)
            if(options.includes(fields)){
                Newquery[fields] = {[operator]:Number(value)}
                console.log(Newquery[fields], "gb")
            }

        })
        console.log(Filters, "gb")

    }

    // console.log(Newquery[fields], "gb")
    console.log(Newquery)

    let result =  product.find(Newquery)

    if(sort){
        console.log(sort)
        let sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }
    else{
        result = result.sort("createdAt")
    }
    if(field){
        console.log(field)
        let fieldList = field.split(",").join(" ")
        result = result.select(fieldList)
    }

    
    const page = Number(req.query.page) || 1
    const limit= Number(req.query.limit) || 10
    const skip = (page -1) * limit
    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(201).json({Product:products, nbHits:products.length})
}



module.exports = {getproducts, getproductstatic}