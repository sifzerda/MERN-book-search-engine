const { User } = require('../models');

const resolvers = {
    Query: {
        getMe: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }
        },
        
        Mutation: {

            createUser: async (parent, args) => {
                const user = await User.create(args);
                return user;
            },

            loginUser: async (parent, { email, password }) => {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new AuthenticationError('Incorrect credentials');
                }
                const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect credentials');
                }
                const token = signToken(user);
                return { token, user };
            },

            saveBook: async (parent, { bookId }, context) => {
                if (context.user) {
                    const updatedUser = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { savedBooks: bookId } },
                        { new: true }
                    );
                    return updatedUser;
                }
            },
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
            }
        }
    }
};

module.exports = resolvers;
