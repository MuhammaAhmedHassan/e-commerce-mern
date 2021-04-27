const Pages = require("../pages/model");
const PersonalDetails = require("../personal-details/model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const isValidObjectId = mongoose.isValidObjectId;

exports.getPagesOld = async (req, res) => {
  try {
    const pages = await Pages.find().sort({ createdAt: -1 }).populate([{ path: "author" }]);
    return res.status(200).json(pages);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "something went wrong" });
  }
};

exports.getPages = async (req, res) => {
  // const result= await Pages.updateMany({})
  // const result = await Pages.updateMany({ published: { $exists: false } }, { $set: { published: true } })
  // console.log("result", result);

  const { sortBy, keyword, author } = req.query;

  const sort = { [sortBy]: -1 }
  const userId = req.user ? req.user._id : null;
  try {
    const matchAuthor = (isValidObjectId(author)) ? { author: ObjectId(author) } : {}
    const pages = await Pages.aggregate([
      { $match: { ...matchAuthor, published: true } },
      {
        $lookup: {
          from: "personal_details",
          localField: "author",
          foreignField: "user",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          // __v: 1,
          // "user.__v": 0,
          title: 1,
          content: 1,
          coverImage: 1,
          createdAt: 1,
          comment: 1,
          // likes: 1,
          dislikes: 1,
          countLikes: { $size: '$likes' },
          likes: {
            $filter: {
              input: "$likes", as: "like",
              cond: { $eq: ["$$like", ObjectId(userId)] }
            }
          },
          // bookmarks:1,
          bookmarks: {
            $filter: {
              input: "$bookmarks", as: "bookmark",
              cond: { $eq: ["$$bookmark", ObjectId(userId)] }
            }
          },
          "author.name": { $concat: ["$author.firstName", " ", "$author.lastName"] }
        },
      },
      {
        $match: {
          $or:
            [{
              "title": {
                $regex: keyword.toString(),
                $options: "i",
              }
            },
            {
              "content": {
                $regex: keyword.toString(),
                $options: "i",
              }
            }]
        }
      },
      { $sort: sort },
      // { $sortByCount:  "$likes" }
    ]);
    // console.log(pages);
    return res.status(200).json(pages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};
exports.getSinglePages = async (req, res) => {
  console.log("GET SINGLE PAGE");
  try {
    userId = req.user ? req.user._id : null;
    const pages = await Pages.aggregate([
      { $match: { _id: ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "personal_details",
          localField: "author",
          foreignField: "user",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "page_comments",
          localField: "_id",
          foreignField: "page",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          coverImage: 1,
          createdAt: 1,
          comment: 1,
          dislikes: 1,
          countComments: { $size: '$comments' },
          countLikes: { $size: '$likes' },
          likes: {
            $filter: {
              input: "$likes", as: "like",
              cond: { $eq: ["$$like", ObjectId(userId)] }
            }
          },
          bookmarks: {
            $filter: {
              input: "$bookmarks", as: "bookmark",
              cond: { $eq: ["$$bookmark", ObjectId(userId)] }
            }
          },
          "categories.category": -1,
          "author.profilePicture": -1,
          "author._id": "$author.user",
          "author.tagLine": "$author.tagLine",
          "author.name": { $concat: ["$author.firstName", " ", "$author.lastName"] }
        },
      }
    ]);
    console.log(pages);
    return res.status(200).json(pages[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

exports.getFilteredPages = async (req, res) => {
  const { sortBy } = req.query;
  const sort = { [sortBy]: -1 }
  try {
    console.log(req.query)
    let { from, to, authorName, author, category } = req.query;
    console.log(req.query);
    userId = req.user ? req.user._id : null;
    const matchAuthor = (isValidObjectId(author)) ? { author: ObjectId(author) } : {}
    const pages = await Pages.aggregate([
      { $match: { published: true, createdAt: { $gte: new Date(from), $lt: new Date(to) } } },
      {
        $lookup: {
          from: "personal_details",
          localField: "author",
          foreignField: "user",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      // { $match: { "categories.category": { $in: ["Education", "Test"] } } },
      {
        $project: {
          title: 1,
          content: 1,
          coverImage: 1,
          createdAt: 1,
          comment: 1,
          likes: 1,
          dislikes: 1,
          countLikes: { $size: '$likes' },
          likes: {
            $filter: {
              input: "$likes", as: "like",
              cond: { $eq: ["$$like", ObjectId(userId)] }
            }
          },
          bookmarks: {
            $filter: {
              input: "$bookmarks", as: "bookmark",
              cond: { $eq: ["$$bookmark", ObjectId(userId)] }
            }
          },
          "categories.category": 1,
          "categories._id": 1,
          "author.name": { $concat: ["$author.firstName", " ", "$author.lastName"] }
        },
      },
      {
        $match: {
          $and:
            [{
              "author.name": {
                $regex: authorName.toString(),
                $options: "i",
              }
            },
            {
              "categories.category": {
                $regex: category.toString(),
                $options: "i",
              }
            }]
        }
      },
      { $sort: sort },
    ]);
    // console.log(pages);
    // const pages1 = await Pages.find({ createdAt: { $gte: from, $lte: to } })
    console.log(pages.length)
    return res.status(200).json(pages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};
exports.getBookmarkedPages = async (req, res) => {
  try {
    const { author } = req.query
    userId = req.user ? req.user._id : null;
    const matchAuthor = (isValidObjectId(author)) ? { author: ObjectId(author) } : {}

    const pages = await Pages.aggregate([
      { $match: { ...matchAuthor, published: true, bookmarks: ObjectId(userId) } },
      {
        $lookup: {
          from: "personal_details",
          localField: "author",
          foreignField: "user",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          coverImage: 1,
          createdAt: 1,
          comment: 1,
          likes: 1,
          dislikes: 1,
          countLikes: { $size: '$likes' },
          likes: {
            $filter: {
              input: "$likes", as: "like",
              cond: { $eq: ["$$like", ObjectId(userId)] }
            }
          },
          bookmarks: {
            $filter: {
              input: "$bookmarks", as: "bookmark",
              cond: { $eq: ["$$bookmark", ObjectId(userId)] }
            }
          },
          "categories.category": 1,
          "categories._id": 1,
          "author.name": { $concat: ["$author.firstName", " ", "$author.lastName"] }
        },
      },
      // { $sort: sort },
    ]);
    console.log(pages.length)
    return res.status(200).json(pages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};


exports.getCreators = async (req, res) => {
  const { sortBy } = req.query;
  const sort = { [sortBy]: -1 }
  userId = req.user ? req.user._id : null;
  try {

    const counts = await Pages.countDocuments();
    const pages = await Pages.aggregate([
      {
        $lookup: {
          from: "personal_details",
          localField: "author",
          foreignField: "user",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $group: {
          "_id": "$author",
          "count": { "$sum": 1 },
        }
      },

      {
        $project: {
          user: 1,
          count: 1,
          "profilePicture": "$_id.profilePicture",
          "name": { $concat: ["$_id.firstName", " ", "$_id.lastName"] },
          "tagLine": "$_id.tagLine",
          followers: {
            $filter: {
              input: "$_id.followers", as: "follower",
              cond: { $eq: ["$$follower", ObjectId(userId)] }
            }
          },
          "_id": "$_id.user",
          // "_id": 0,
        },
      },

    ]);
    console.log(pages)
    return res.status(200).json(pages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

exports.getIp = async (req, res) => {
  console.log(req.connection);
  res.json({ Ip: "" })
}




exports.searchUrl = async (req, res) => {
  try {
    const results = await PersonalDetails.find({
      publicDisplayUrl: {
        $regex: req.params.keyword.toString(),
        $options: "i",
      },
    }).select("firstName lastName email publicDisplayUrl");
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "something went wrong" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const results = await PersonalDetails.findOne({
      publicDisplayUrl: req.params.url,
    });
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "something went wrong" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comments.find({ page: req.params.id });
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Something went wrong" });
  }
};
exports.addView = async (req, res) => {
  try {

    const result = await Pages.update({ _id: req.query.id }, { $push: { views: req.query } });
    console.log("View Counted", result)
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Something went wrong" });
  }
};
