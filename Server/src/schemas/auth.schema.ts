import {z} from 'zod';

// Enhanced password validation
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password must be less than 128 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");

// Enhanced name validation
const nameSchema = z.string()
  .min(2, "Name must be at least 2 characters long")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
  .trim();

// Enhanced email validation
const emailSchema = z.string()
  .email("Invalid email format")
  .max(255, "Email must be less than 255 characters")
  .toLowerCase()
  .trim();

export const registerSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
});

// Additional schemas for other endpoints
export const emailOnlySchema = z.object({
    email: emailSchema,
});

export const otpSchema = z.object({
    email: emailSchema,
    otp: z.string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export const updatePasswordSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

// Contact form validation
export const contactSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: z.string()
        .min(8, "Phone number must be at least 8 digits")
        .max(20, "Phone number must be less than 20 digits")
        .regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number format"),
    address: z.string()
        .min(5, "Address must be at least 5 characters")
        .max(255, "Address must be less than 255 characters")
        .trim()
        .optional(),
    subject: z.string()
        .min(3, "Subject must be at least 3 characters")
        .max(100, "Subject must be less than 100 characters")
        .trim(),
    message: z.string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be less than 1000 characters")
        .trim(),
});