# Security Guidelines for ChezFlora

## 🚨 Environment Variables Security

### CRITICAL: .env Files Must NEVER Be Committed

The `.env` files contain sensitive information including:
- Database credentials and connection strings
- JWT secrets for authentication
- API keys and secrets (Cloudinary, PayPal, etc.)
- Email service credentials

### Setup Instructions

1. **Copy the example files:**
   ```bash
   cp Server/.env.example Server/.env
   cp client/.env.example client/.env
   ```

2. **Fill in your actual values** in the `.env` files
3. **NEVER commit the `.env` files to version control**

### Security Checklist

- [ ] `.env` files are listed in `.gitignore`
- [ ] No sensitive data in `.env.example` files
- [ ] Strong, random JWT secrets (at least 32 characters)
- [ ] Different secrets for development and production
- [ ] Database credentials are not shared publicly

### If Secrets Are Compromised

If any secrets have been exposed in the repository:

1. **Immediately rotate all credentials:**
   - Change database passwords
   - Generate new JWT secrets
   - Regenerate API keys (Cloudinary, PayPal, etc.)
   - Update email service credentials

2. **Remove sensitive data from Git history:**
   ```bash
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch Server/.env client/.env' \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **Force push to remote (WARNING: This rewrites history):**
   ```bash
   git push origin --force --all
   git push origin --force --tags
   ```

### Best Practices

1. **Use strong, unique secrets** for each environment
2. **Regularly rotate credentials**
3. **Use environment-specific configurations**
4. **Monitor for exposed secrets** in commits
5. **Use secret management tools** in production

### Emergency Contact

If you discover exposed secrets, immediately:
1. Rotate all affected credentials
2. Review access logs for unauthorized usage
3. Update this documentation if needed

---

**Remember: Security is everyone's responsibility!**