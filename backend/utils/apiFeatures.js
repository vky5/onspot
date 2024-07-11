class APIFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    finding(){
        const queryStr = {...this.queryString};
        const excludeEle = ['page', 'sort', 'limit', 'fields'];

        excludeEle.forEach(ele=> delete queryStr[ele]);

        let qustr = JSON.stringify(queryStr);
        qustr = qustr.replace(/\b{lte|lt|gte|gt}\b/g, match=> `$${match}`);

        this.query = this.query.find(JSON.parse(qustr));

        return this;
    }

    sorting(){
        if (this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-date');
        }

        return this;
    }

    filtering(){
        if (this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields + ' -__v' + ' -_id');
        }else{
            this.query = this.query.select('-__v');
        }

        return this;
    }


    pagination(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 20;

        const skip = (page - 1)*limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}


module.exports = APIFeatures;