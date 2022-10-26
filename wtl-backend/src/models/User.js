import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
			trim: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified("password")) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	const match = bcrypt.compareSync(candidatePassword, this.password);
	return match;
};

const User = mongoose.model("User", UserSchema);
export default User;
