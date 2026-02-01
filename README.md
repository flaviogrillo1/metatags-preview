# Meta Tags Preview Tool 🌍🎨

Preview and validate Open Graph and Twitter Card meta tags for any URL. See how your content appears on Facebook, Twitter, LinkedIn, and more before sharing.

![Meta Tags Preview](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![15 Languages](https://img.shields.io/badge/Languages-15-green?style=for-the-badge)
![Stripe](https://img.shields.io/badge/Stripe-Payments-purple?style=for-the-badge&logo=stripe)

## 🌍 Available in 15 Languages

The tool is fully localized and available in:

- 🇬🇧 **English** - https://metatags-preview.vercel.app
- 🇪🇸 **Español** - https://metatags-preview.vercel.app/es
- 🇵🇹 **Português** - https://metatags-preview.vercel.app/pt
- 🇫🇷 **Français** - https://metatags-preview.vercel.app/fr
- 🇩🇪 **Deutsch** - https://metatags-preview.vercel.app/de
- 🇮🇹 **Italiano** - https://metatags-preview.vercel.app/it
- 🇳🇱 **Nederlands** - https://metatags-preview.vercel.app/nl
- 🇵🇱 **Polski** - https://metatags-preview.vercel.app/pl
- 🇷🇺 **Русский** - https://metatags-preview.vercel.app/ru
- 🇯🇵 **日本語** - https://metatags-preview.vercel.app/ja
- 🇨🇳 **中文** - https://metatags-preview.vercel.app/zh
- 🇰🇷 **한국어** - https://metatags-preview.vercel.app/ko
- 🇸🇦 **العربية** - https://metatags-preview.vercel.app/ar
- 🇮🇳 **हिन्दी** - https://metatags-preview.vercel.app/hi
- 🇹🇷 **Türkçe** - https://metatags-preview.vercel.app/tr

## ✨ Features

- 🔍 **Live Preview**: See exactly how your links look on Facebook, Twitter/X, and LinkedIn
- 🌐 **15 Languages**: Full localization with native URLs and SEO
- 📝 **URL Fetching**: Enter any URL to automatically fetch and display its meta tags
- ✏️ **Manual Input**: Manually edit meta tags to test different combinations
- ✅ **Validation**: Get instant feedback on missing or suboptimal meta tags
- 📥 **Export as PNG**: Download preview images to share with your team
- 🚀 **SEO Optimized**: 38 static pages with proper meta tags for all languages
- 💰 **Freemium Model**: 5 free previews/day, unlimited with Pro plan
- 🔒 **Stripe Integration**: Secure payment processing for subscriptions

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **i18n**: next-intl (15 languages)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payment**: Stripe Checkout
- **Deployment**: Vercel (auto-deploy)
- **Scraping**: Cheerio
- **Export**: html2canvas

## 💡 How to Use

### Quick Start

1. **Visit the tool**: Go to https://metatags-preview.vercel.app
2. **Enter a URL**: Paste any website URL (e.g., https://example.com)
3. **Click "Fetch Meta Tags"**: The tool will retrieve and display the meta tags
4. **See Previews**: View how your link appears on Facebook, Twitter, and LinkedIn
5. **Edit Tags**: Modify the meta tags manually to test different versions
6. **Export**: Download the preview as a PNG image

### Understanding the Results

- **Green checkmarks**: Your meta tags are properly configured
- **Yellow warnings**: Minor issues that could be improved
- **Red errors**: Critical problems that need attention

### Language Switching

The tool automatically detects your browser language. To change it:
- Click the language selector in the top-right corner
- Or use localized URLs like `/es` for Spanish, `/fr` for French

## 💳 Pricing

### Free Plan
- ✅ 5 meta tag previews per day
- ✅ All preview platforms (FB, Twitter, LinkedIn)
- ✅ All 15 languages
- ✅ Manual tag editing
- ✅ Validation & warnings
- ✅ Export as PNG

### Pro Plan (€0.99/day)
- ✅ Unlimited previews
- ✅ No daily limits
- ✅ All languages unlocked
- ✅ Priority support

Payment is processed securely through Stripe. You get 24 hours of unlimited access for €0.99 - no subscription, no recurring charges.

## 📦 Installation & Development

### Clone and Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/flaviogrillo1/metatags-preview.git
   cd metatags-preview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   
   ```env
   # Stripe (optional - needed only for payments)
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   
   # App
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run build
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Build Stats

- **38 static pages** (15 languages × 2 pages + not-found)
- **102 kB** First Load JS shared by all
- **45.8 kB** Middleware (locale detection)
- **Optimized** for production deployment

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key | No* |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | No* |
| `NEXT_PUBLIC_BASE_URL` | Your app's public URL | Yes |

*Only required if you want to enable payments. The tool works without Stripe for the free tier.

## 🌐 Adding a New Language

To add support for additional languages:

1. Add the locale code to `lib/i18n.ts`
2. Create a new translation file in `messages/` (e.g., `messages/fr.json`)
3. Run `npm run build` to generate the new pages
4. Commit and push - the new language will be available immediately

Example translation file structure:
```json
{
  "common": {
    "title": "Titre en français",
    "subtitle": "Sous-titre"
  }
}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy!

Vercel will automatically:
- Build all 38 static pages
- Deploy to global CDN
- Set up the middleware for locale detection
- Enable HTTPS

**That's it!** The tool will be live in seconds with all 15 languages working.

## 📊 SEO Features

- **38 Static Pages**: Pre-rendered for all language combinations
- **Dynamic Meta Tags**: Customized for each language
- **Sitemap**: Auto-generated with all locale variations
- **Hreflang Tags**: Proper multilingual SEO signals
- **Open Graph**: Optimized for social sharing
- **Twitter Cards**: Platform-specific cards
- **Web Manifest**: PWA-ready

## 🤝 Contributing

Contributions are welcome! Areas where you can help:

- Add new languages
- Improve translations
- Fix bugs
- Add new preview platforms
- Enhance SEO

Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Stripe](https://stripe.com/) - Payment processing
- [Cheerio](https://cheerio.js.org/) - HTML parsing
- [Lucide](https://lucide.dev/) - Beautiful icons

---

Made with ❤️ for the global community
