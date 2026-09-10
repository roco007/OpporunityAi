# Deployment Guide

This guide will help you deploy OpportunityAI to Vercel with your Gemini API key configured via environment variables.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A Google Gemini API key (get one free at https://aistudio.google.com/apikey)
3. Git repository with your project code

## Step 1: Prepare Your Repository

Make sure your repository includes:
- All source code
- `package.json` with dependencies
- `vercel.json` configuration file
- `.env.example` (for reference, NOT your actual API key)

**Important**: Never commit `.env.local` or any file containing your actual API key to Git.

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect it as a Vite project
4. **Before clicking Deploy**, expand "Environment Variables"
5. Add the following variables:

```
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash
```

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   vercel
   ```

4. When prompted, add environment variables:
   - `VITE_GEMINI_API_KEY`: Your actual Gemini API key
   - `VITE_GEMINI_MODEL`: `gemini-2.5-flash` (or your preferred model)

5. Confirm deployment

## Step 3: Verify Deployment

1. Open your deployed URL (e.g., https://your-project.vercel.app)
2. Navigate to the "Generate" page
3. You should see: "✓ AI configured via environment (gemini-2.5-flash)"
4. Try generating opportunities - it should work without any manual configuration!

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | `AIzaSy...` |
| `VITE_GEMINI_MODEL` | Gemini model to use | `gemini-2.5-flash` |

### Available Models

- `gemini-2.5-pro` - Most capable, best quality
- `gemini-2.5-flash` - **Recommended** - Great balance of speed and quality
- `gemini-2.5-flash-lite` - Fastest, lowest cost
- `gemini-2.0-flash` - Stable, well-tested

## Managing Environment Variables

### View Current Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. You'll see all configured variables

### Update Variables

1. In the Environment Variables section, click the edit icon next to a variable
2. Update the value
3. Click "Save"
4. **Redeploy** for changes to take effect:
   ```bash
   vercel --prod
   ```

### Add Variables for Specific Environments

Vercel supports different environments (Production, Preview, Development):

1. In Environment Variables, click "Add"
2. Enter the variable name and value
3. Select which environments should use this variable:
   - **Production**: Live site
   - **Preview**: Pull request previews
   - **Development**: Local development with `vercel dev`

## Local Development with Environment Variables

### Option 1: Using .env.local (Recommended)

1. Create `.env.local` in your project root:
   ```bash
   VITE_GEMINI_API_KEY=your_actual_key_here
   VITE_GEMINI_MODEL=gemini-2.5-flash
   ```

2. Run your dev server:
   ```bash
   npm run dev
   ```

3. The app will automatically use these values

### Option 2: Using Vercel CLI

1. Pull environment variables from Vercel:
   ```bash
   vercel env pull .env.local
   ```

2. Run your dev server:
   ```bash
   npm run dev
   ```

## Security Notes

### API Key Exposure

⚠️ **Important**: Since this is a client-side application, your Gemini API key will be exposed in the browser. This is acceptable for:
- Personal projects
- Internal tools
- Demo/prototype applications

For production applications with sensitive data, consider:
1. Using a backend proxy to hide the API key
2. Implementing rate limiting
3. Setting up API key restrictions in Google Cloud Console

### Restricting Your API Key

To secure your Gemini API key:

1. Go to https://console.cloud.google.com/apis/credentials
2. Click on your API key
3. Under "Application restrictions", add:
   - **HTTP referrers**: Restrict to your Vercel domain
   - Example: `https://your-project.vercel.app/*`
4. Save changes

This prevents others from using your API key on different domains.

## Troubleshooting

### "API key not configured" Error

**Problem**: The app shows "Configure Gemini API key" even though you set it in Vercel.

**Solution**:
1. Verify the variable name is exactly `VITE_GEMINI_API_KEY` (must start with `VITE_`)
2. Check that you deployed **after** adding the environment variable
3. Redeploy if needed: `vercel --prod`

### "Invalid API key" Error

**Problem**: The app shows an error when trying to generate opportunities.

**Solution**:
1. Verify your API key is correct in Vercel environment variables
2. Test the key at https://aistudio.google.com/app/apikey
3. Check that your Google Cloud project has the Generative Language API enabled

### "Rate limit exceeded" Error

**Problem**: You're hitting Gemini's rate limits.

**Solution**:
1. Wait a few minutes and try again
2. Consider upgrading to a paid Google Cloud plan
3. Implement user rate limiting in your app

### Build Fails on Vercel

**Problem**: Deployment fails during build.

**Solution**:
1. Check the build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Try building locally first: `npm run build`
4. Ensure Node.js version is compatible (check `.nvmrc` if you have one)

## Custom Domain Setup

1. Go to your Vercel project → **Settings** → **Domains**
2. Add your custom domain (e.g., `opportunityai.com`)
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (usually 5-30 minutes)
5. SSL certificate will be automatically provisioned

## Monitoring & Analytics

### Vercel Analytics

1. Enable Vercel Analytics in your project settings
2. View performance metrics, web vitals, and user analytics
3. Monitor deployment status and errors

### Application Logs

1. Go to your Vercel project → **Deployments**
2. Click on a deployment to view build logs
3. For runtime logs, use Vercel's built-in logging or integrate with a service like LogRocket

## Cost Management

### Gemini API Costs

- **Free tier**: 60 requests per minute, 1,500 per day
- **Paid tier**: Pay per use, starting at ~$0.000125 per request

### Monitoring Usage

1. Go to https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com
2. View quota and usage metrics
3. Set up budget alerts to avoid unexpected charges

### Cost Optimization Tips

1. Use `gemini-2.5-flash-lite` for development/testing
2. Implement caching for repeated queries
3. Add user rate limiting
4. Monitor usage patterns and adjust accordingly

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Gemini API Documentation**: https://ai.google.dev/docs
- **Vercel Support**: https://vercel.com/support

---

**Need help?** Check the main README.md or open an issue in your repository.
