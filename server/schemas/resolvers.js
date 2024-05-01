const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },

        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect password or email');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password or email');
            }
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookInput }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookInput } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Please log in to save a book.');
        },

        deleteBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Please log in to delete a book.');
        }
    }
};

module.exports = resolvers;