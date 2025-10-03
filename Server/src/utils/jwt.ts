import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
}

if (!JWT_REFRESH_SECRET) {
    console.warn("JWT_REFRESH_SECRET is not defined, using JWT_SECRET as fallback");
}

export interface TokenPayload {
    id: string;
    email: string;
    role: string;
    name: string;
    iat?: number;
    exp?: number;
}

export const generateToken = (id: string, email: string, role: string, name: string): string => {
    if (!id || !email || !role || !name) {
        throw new Error("All token parameters are required");
    }

    const payload: TokenPayload = {
        id: id.toString(),
        email: email.toLowerCase().trim(),
        role: role.toUpperCase(),
        name: name.trim()
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h',
        issuer: 'chezflora-api',
        audience: 'chezflora-client',
        algorithm: 'HS256'
    });
};

export const generateRefreshToken = (id: string): string => {
    if (!id) {
        throw new Error("User ID is required for refresh token");
    }

    return jwt.sign(
        { id: id.toString(), type: 'refresh' },
        JWT_REFRESH_SECRET || JWT_SECRET,
        {
            expiresIn: '7d',
            issuer: 'chezflora-api',
            audience: 'chezflora-client',
            algorithm: 'HS256'
        }
    );
};

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, JWT_SECRET, {
            issuer: 'chezflora-api',
            audience: 'chezflora-client',
            algorithms: ['HS256']
        }) as TokenPayload;

        // Validate required fields
        if (!decoded.id || !decoded.email || !decoded.role || !decoded.name) {
            console.error('Invalid token payload: missing required fields');
            return null;
        }

        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.warn('Token expired');
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.warn('Invalid token');
        } else {
            console.error('Token verification error:', error);
        }
        return null;
    }
};

export const verifyRefreshToken = (token: string): { id: string } | null => {
    try {
        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, JWT_REFRESH_SECRET || JWT_SECRET, {
            issuer: 'chezflora-api',
            audience: 'chezflora-client',
            algorithms: ['HS256']
        }) as any;

        if (!decoded.id || decoded.type !== 'refresh') {
            return null;
        }

        return { id: decoded.id };
    } catch (error) {
        console.warn('Refresh token verification failed:', error);
        return null;
    }
};

export const decodeToken = (token: string): TokenPayload | null => {
    try {
        const decoded = jwt.decode(token) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error('Token decode error:', error);
        return null;
    }
};