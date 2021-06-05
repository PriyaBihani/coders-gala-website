require('dotenv').config();

let mongoose = require('mongoose'),
    Topic = require('./services/mongodb/models/Topic');


const query = async () => {
    try {
        mongoose
            .connect(`${process.env.MONGO_URI}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('DB Connected');
            })
            .catch((err) => {
                console.log('ERROR iN DB CONNECTION', err);
            });


        // const topics = {
        //     locked: false,
        //     articles: [
        //         "6026db6197bf20e42b562c1e",
        //         "6026dbc197bf20e42b562c20",
        //         "6026dbde97bf20e42b562c21",
        //         "6026dcfc97bf20e42b562c22",
        //         "6026dd1d97bf20e42b562c23",
        //         "6026dd4197bf20e42b562c24"
        //     ],
        //     videos: ["60a4f2505256f6431019fb9b", "60a4f37a7ee5b62f181237d7"],
        //     _id: "6026db4897bf20e42b562c1d",
        //     SpecialityId: 6026da5d97bf20e42b562c1c,
        //     createdAt: 2021 - 02 - 12T19: 47: 20.387Z,
        //     updatedAt: 2021 - 05 - 20T05: 13: 39.440Z,
        //     __v: 0,
        //     name: 'HTML',
        //     Name: 'HTML'
        // }

        // topics.forEach(async topic => {
        //     const newTopic = topic
        //     newTopic.name = topic.Name
        //     delete newTopic["Name"]
        //     console.log(newTopic)
        //     await Topic.findByIdAndUpdate(topic._id, newTopic)
        // await Topic.collection.dropIndex("Name")
        // })
    } catch (err) {
        console.log(err.message)
    }
}

query()