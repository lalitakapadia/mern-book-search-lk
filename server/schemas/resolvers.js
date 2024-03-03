const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id}).select(
                    '_v -password'
                );
                return userData;
            }
            throw new AuthenticationError('Please log in first');
        },
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('can not find user');
            }

            const correctPassword = await User.isCorrectPassword(password);
            if (correctPassword) {
                throw new AuthenticationError('Wrong password');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate({_id: context.user._id},
                    {$push: {savedBooks: bookData}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('Please log in first');
        },
        removeBook: async (parent, { bookId}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId}}},
                    {new: true}
                );
                return updatedUser;
            }
        },
    },
};

module.exports = resolvers;