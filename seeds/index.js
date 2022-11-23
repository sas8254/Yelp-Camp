const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/YelpCamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo Connection Open!!!");
  })
  .catch((err) => {
    console.log("mongo error");
    console.log(err);
  });

const sample = function (arrey) {
  return arrey[Math.floor(Math.random() * arrey.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);

    const camp = new Campground({
      author: "636f2ac35d6e5a21dfa38217",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dwkrtdkxt/image/upload/v1668700055/YelpCamp/n1cuu7efx1ernbapso5v.jpg",
          filename: "YelpCamp/n1cuu7efx1ernbapso5v",
        },
        {
          url: "https://res.cloudinary.com/dwkrtdkxt/image/upload/v1668700054/YelpCamp/xwasay8p6oqfxv5fbpko.jpg",
          filename: "YelpCamp/xwasay8p6oqfxv5fbpko",
        },
      ],
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur cum dolor asperiores! Iusto soluta nam quas sint quam exercitationem! A vel modi aut aperiam quidem eligendi quam placeat tempora illum?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
