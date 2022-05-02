module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const LogSchema = new Schema({
        docId: {
            type: String
        },
        // title: {
        //     type: String
        // },
        username: String,
        type: {
            type: String,
        },
        detail: {
            type: String,
        },
        desc: {
            type: String,
        },
        docTitle: {
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
        isTag: {
            type: Boolean,
            default: false
        },



    });
    return mongoose.model('Log', LogSchema, 'log');
}