# 🚀 Deployment Guide

## GitHub Repository
✅ **Created**: https://github.com/VibeGrind/telegram-mini-app

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended - 2 minutes)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" and login with GitHub

2. **Import Project**
   - Click "New Project"
   - Select `VibeGrind/telegram-mini-app` from the list
   - Click "Import"

3. **Configure Project** (auto-detected)
   - Framework Preset: Vite ✅ (auto-detected)
   - Build Command: `npm run build` ✅ (auto-detected)
   - Output Directory: `dist` ✅ (auto-detected)
   - Install Command: `npm install` ✅ (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Get your URL: `https://telegram-mini-app-xxxx.vercel.app`

5. **Update Telegram Bot**
   - Open [@BotFather](https://t.me/botfather)
   - Send `/setmenubutton`
   - Select `@mini_apps_funy_bot`
   - Enter Vercel URL: `https://your-app.vercel.app`
   - Done! 🎉

---

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts and your app will be deployed!

---

## Environment Variables (Optional)

If you need to add environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables:
   - `VITE_BOT_TOKEN`: `8408674903:AAFjiyu9wG_FQZUYL1nut0-Qvc9h6TE_TnQ`
   - `VITE_APP_NAME`: `Telegram Mini App`

---

## Auto-Deploy Setup

✅ **Already configured!** Every `git push` to `main` branch will automatically deploy to Vercel.

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push origin main

# Vercel will automatically deploy the changes!
```

---

## Project Structure

```
telegram-mini-app/
├── src/                      # Source code
│   ├── components/           # React components
│   ├── pages/                # Page components
│   ├── hooks/                # Custom hooks
│   ├── data/                 # Mock data
│   └── types/                # TypeScript types
├── public/                   # Static assets
├── .github/workflows/        # GitHub Actions (optional)
├── vercel.json              # Vercel configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies

```

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update URL in BotFather

---

## Troubleshooting

### Build fails on Vercel

Check build logs in Vercel Dashboard. Common issues:
- Missing dependencies: `npm install` locally first
- TypeScript errors: Run `npm run type-check` locally
- Build errors: Run `npm run build` locally to test

### App doesn't open in Telegram

1. Check URL is HTTPS (not HTTP)
2. Verify URL in BotFather is correct
3. Clear Telegram cache
4. Check Vercel deployment status

### White screen in Telegram

1. Check browser console for errors
2. Verify Telegram SDK is loaded: `window.Telegram?.WebApp`
3. Check CORS headers in Vercel logs

---

## Next Steps

After deploying to Vercel:

1. ✅ Update URL in BotFather
2. ✅ Test app in Telegram
3. 📱 Test on mobile devices
4. 🎨 Customize your app
5. 🔄 Push changes to GitHub (auto-deploys!)

---

## Useful Links

- **GitHub Repo**: https://github.com/VibeGrind/telegram-mini-app
- **Vercel Docs**: https://vercel.com/docs
- **Telegram Mini Apps**: https://core.telegram.org/bots/webapps
- **Bot**: @mini_apps_funy_bot

---

## Support

If you need help:
1. Check Vercel deployment logs
2. Check GitHub Actions logs (if using)
3. Review TELEGRAM_MINI_APP_SETUP.md for detailed setup

Good luck! 🚀
