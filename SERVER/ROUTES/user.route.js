import express from "express";
import {
  createUser,
  getAllUsers,
  getAllDeletedUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logOut,
  checkAuth,
  upload,
  sendEmail,
} from "../CONTROLLERS/user.controller.js"; // Asegúrate que la ruta es correcta
import { isAuth, authRole } from "../MIDDLEWARE/auth.middleware.js"; // Asegúrate que la ruta es correcta

const userRouter = express.Router();

/**
 * @module UserRoutes
 * @description Defines routes for managing users.
 */

/**
 * @route POST /users/register
 * @description Register a new user.
 * @access Public
 * @returns {Object} The register user.
 * @example POST http://localhost:5173/users/register
 */
userRouter.post(
  "/users/register",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "officePictures", maxCount: 5 }, // Ajusta maxCount según necesites
  ]),
  createUser
);

/**
 * @route GET /users
 * @description Retrieves all not deleted users.
 * @access Public
 * @returns {Array} List of not deleted users.
 * @example GET http://localhost:3001/users
 */
userRouter.get("/users", getAllUsers);

/**
 * @route GET /users/deleted
 * @description Retrieves all deleted users.
 * @access Public
 * @returns {Array} List of deleted users.
 * @example GET http://localhost:3001/users/deleted
 */
userRouter.get("/users/deleted", isAuth, authRole("admin"), getAllDeletedUsers);

/**
 * @route GET /users/:id
 * @description Retrieves a user by their ID.
 * @returns {Object} The found user.
 * @access Public
 * @example GET http://localhost:3001/users/6160171b1494489759d31572
 */
userRouter.get("/users/:id", isAuth, authRole("admin"), getUserById);

/**
 * @route PATCH /users/:id
 * @description Partially updates a user by their ID.
 * @returns {Object} The updated user.
 * @access Private
 * @example PATCH http://localhost:3001/users/update/6160171b1494489759d31572
 */
userRouter.patch("/users/update/:id", isAuth, authRole("admin"), updateUser);

/**
 * @route PATCH /users/:id
 * @description Logicaly deletes a user by their ID.
 * @returns {string} Success message.
 * @access Private
 * @example PATCH http://localhost:3001/users/delete/6160171b1494489759d31572
 */
userRouter.patch("/users/delete/:id", isAuth, authRole("admin"), deleteUser);

/**
 * @route POST /users/login
 * @description Authenticates a user and returns a JWT.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.password - User's password.
 * @returns {Object} JSON response with token and user info or error message.
 * @example POST http://localhost:3001/users/login
 */
userRouter.post("/users/login", loginUser);

/**
 * @route GET /users/check-auth
 * @description Checks if the user is authenticated.
 * @access Private
 * @returns {Object} JSON response with `isAuthenticated` boolean and `userRole` if authenticated, or an error message if not.
 * @example GET http://localhost:3001/users/check-auth
 */
userRouter.get("/users/check-auth", isAuth, checkAuth);

/**
 * @route POST /users/logout
 * @description Logs out the user.
 * @access Public
 * @returns {string} message
 * @example POST http://localhost:3001/users/logout
 */
userRouter.post("/users/logout", logOut)

/**
 * @route GET /users/sendEmail
 * @description Sends a recovery email to the user.
 * @access Public
 * @returns {string} message
 * @example GET http://localhost:3001/users/sendEmail
 *
 */
userRouter.get("/users/sendEmail", sendEmail);

export default userRouter;
