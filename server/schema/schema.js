const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} = graphql;

const Product = require('../models/product');
const User = require('../models/users');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    descr: { type: GraphQLString },
    color: { type: GraphQLString },
    price: { type: GraphQLString },
    modelParam: { type: GraphQLString },
    care: { type: GraphQLString },
    composition: { type: GraphQLString },
    sizes: { type: GraphQLString },
    lastPrice: { type: GraphQLString },
    type: { type: GraphQLString },
    photos: { type: new GraphQLList(GraphQLString) },
    previewPhoto: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        descr: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        modelParam: { type: new GraphQLNonNull(GraphQLString) },
        composition: { type: new GraphQLNonNull(GraphQLString) },
        sizes: { type: new GraphQLNonNull(GraphQLString) },
        lastPrice: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        photos: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
        previewPhoto: { type: new GraphQLNonNull(GraphQLString) },
        care: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, {
        title,
        descr,
        color,
        price,
        modelParam,
        composition,
        sizes,
        lastPrice,
        type,
        photos,
        care,
        previewPhoto,
      }) {
        const comment = new Product({
          title,
          descr,
          color,
          price,
          modelParam,
          composition,
          sizes,
          lastPrice,
          type,
          care,
          photos,
          previewPhoto,
        });

        return comment.save();
      },
    },
    deleteProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Product.findByIdAndRemove(id);
      }
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        descr: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        modelParam: { type: new GraphQLNonNull(GraphQLString) },
        composition: { type: new GraphQLNonNull(GraphQLString) },
        sizes: { type: new GraphQLNonNull(GraphQLString) },
        lastPrice: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        photos: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
        previewPhoto: { type: new GraphQLNonNull(GraphQLString) },
        care: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, {
        id,
        title,
        descr,
        color,
        price,
        modelParam,
        composition,
        sizes,
        lastPrice,
        type,
        photos,
        care,
        previewPhoto }) {
        return Product.findByIdAndUpdate(id,
          {
            $set: {
              title,
              descr,
              color,
              price,
              modelParam,
              composition,
              sizes,
              lastPrice,
              type,
              photos,
              care,
              previewPhoto
            }
          }, { new: true }
        );
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { name, password }) {
        const user = new User({
          name, password
        });

        return user.save();
      }
    }
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({});
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id)
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});