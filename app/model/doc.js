module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const DocSchema = new Schema({
        creater: {
            type: String
        },
        // title: {
        //     type: String
        // },
        title: {
            type: String,
        },
        id: {
            type: String,
            default: () => Math.random().toString().slice(2,12)
        },

        time: {
            type: Number,
            default: () => Date.now()
        },
        detail: {
            type: String
        },


    });
    return mongoose.model('Doc', DocSchema, 'dic');
}