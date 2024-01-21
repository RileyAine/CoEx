import * as z from 'zod';

export const newUserSchema = z.object({
	email: z.string().email().min(5).max(50),
	password: z.string().min(8).max(14),
	firstName: z.string().min(2).max(20),
	lastName: z.string().min(2).max(20),
});

export const loginSchema = z.object({
	email: z.string().email().min(5).max(50),
	password: z.string().min(8).max(14),
});

export const supportFormSchema = z.object({
	name: z.string().min(5).max(20),
	email: z.string().email().min(5).max(50),
	message: z.string().min(8).max(1000),
});
