import * as z from 'zod';

const emailReqs = { title: 'Email', type: 'string', min: 5, max: 50 };
const passwordReqs = { title: 'Password', type: 'string', min: 8, max: 14 };
const firstNameReqs = { title: 'First Name', type: 'string', min: 2, max: 20 };
const lastNameReqs = { title: 'Last Name', type: 'string', min: 2, max: 20 };
const nameReqs = { title: 'Name', type: 'string', min: 5, max: 40 };
const messageReqs = { title: 'Message', type: 'string', min: 8, max: 1000 };

function min(property: string, requirement: number) {
	return `${property} must contain at least ${requirement} character(s).`;
}

function max(property: string, requirement: number) {
	return `${property} must contain at most ${requirement} character(s).`;
}

function req(property: string) {
	return `${property} is required.`;
}

function inv(property: string, type: string) {
	return `${property} must be a ${type} type.`;
}

const email = z
	.string({
		required_error: req(emailReqs.title),
		invalid_type_error: inv(emailReqs.title, emailReqs.type),
	})
	.email()
	.min(emailReqs.min, { message: min(emailReqs.title, emailReqs.min) })
	.max(emailReqs.max, { message: max(emailReqs.title, emailReqs.max) });

export const loginSchema = z.object({
	email: email,
	password: z
		.string({
			required_error: req(passwordReqs.title),
			invalid_type_error: inv(passwordReqs.title, passwordReqs.type),
		})
		.min(passwordReqs.min, {
			message: min(passwordReqs.title, passwordReqs.min),
		})
		.max(passwordReqs.max, {
			message: max(passwordReqs.title, passwordReqs.max),
		}),
});

export const newUserSchema = loginSchema.extend({
	firstName: z
		.string({
			required_error: req(firstNameReqs.title),
			invalid_type_error: inv(firstNameReqs.title, firstNameReqs.type),
		})
		.min(firstNameReqs.min, {
			message: min(firstNameReqs.title, firstNameReqs.min),
		})
		.max(firstNameReqs.max, {
			message: max(firstNameReqs.title, firstNameReqs.max),
		}),
	lastName: z
		.string({
			required_error: req(lastNameReqs.title),
			invalid_type_error: inv(lastNameReqs.title, lastNameReqs.type),
		})
		.min(lastNameReqs.min, {
			message: min(lastNameReqs.title, lastNameReqs.min),
		})
		.max(lastNameReqs.max, {
			message: max(lastNameReqs.title, lastNameReqs.max),
		}),
});

export const supportFormSchema = z.object({
	name: z
		.string({
			required_error: req(nameReqs.title),
			invalid_type_error: inv(nameReqs.title, nameReqs.type),
		})
		.min(nameReqs.min, { message: min(nameReqs.title, nameReqs.min) })
		.max(nameReqs.max, { message: max(nameReqs.title, nameReqs.max) }),
	email: email,
	message: z
		.string({
			required_error: req(messageReqs.title),
			invalid_type_error: inv(messageReqs.title, messageReqs.type),
		})
		.min(messageReqs.min, { message: min(messageReqs.title, messageReqs.min) })
		.max(messageReqs.max, { message: max(messageReqs.title, messageReqs.max) }),
});

/* const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
}); 

const age = z.number({
  required_error: "Age is required",
  invalid_type_error: "Age must be a number",
});

*/
