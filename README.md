# Meta Tags Preview Tool 🎨

A powerful tool to preview and validate Open Graph and Twitter Card meta tags for any URL. See how your content appears on Facebook, Twitter, LinkedIn, and more before sharing.

![Meta Tags Preview](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Stripe](https://img.shields.io/badge/Stripe-Payments-purple?style=for-the-badge&logo=stripe)

## ✨ Features

- 🔍 **Live Preview**: See exactly how your links look on Facebook, Twitter/X, and LinkedIn
- 🌐 **URL Fetching**: Enter any URL to automatically fetch and display its meta tags
- ✏️ **Manual Input**: Manually edit meta tags to test different combinations
- ✅ **Validation**: Get instant feedback on missing or suboptimal meta tags
- 📥 **Export as PNG**: Download preview images to share with your team
- 🚀 **SEO Friendly**: Fully optimized with proper meta tags for search engines
- 💰 **Freemium Model**: 5 free previews/day, unlimited with Pro plan
- 🔒 **Stripe Integration**: Secure payment processing for subscriptions

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payment**: Stripe Checkout
- **Deployment**: Vercel
- **Scraping**: Cheerio
- **Export**: html2canvas

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/metatags-preview.git
   cd metatags-preview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   
   ```env
   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   STRIPE_PRICE_ID=price_your_price_id_here
   
   # App
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret for payment events | Yes |
| `STRIPE_PRICE_ID` | Price ID for the Pro subscription ($9/mo) | Yes |
| `NEXT_PUBLIC_BASE_URL` | Your app's public URL (used for Stripe redirects) | Yes |

## 💳 Stripe Setup

### 1. Create Stripe Products

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Products** → **Add product**
3. Create a product named "Pro Plan" with:
   - Price: $9/month
   - Recurring billing
4. Copy the **Price ID** to your `.env.local` as `STRIPE_PRICE_ID`

### 2. Set Up Webhooks

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Add endpoint: `https://your-domain.vercel.app/api/webhook/stripe`
3. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Webhook Secret** to `.env.local` as `STRIPE_WEBHOOK_SECRET`

## 🚀 Deployment to Vercel

### Automated Deployment with GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/metatags-preview.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

### Manual Environment Variables in Vercel

In your Vercel project settings:
1. Go to **Settings** → **Environment Variables**
2. Add all variables from `.env.local`
3. Redeploy to apply changes

## 📁 Project Structure

```
metatags-preview/
├── app/
│   ├── api/
│   │   ├── fetch-meta/          # Fetch meta tags from URL
│   │   ├── create-checkout/     # Stripe checkout
│   │   ├── portal/              # Customer portal
│   │   └── webhook/stripe/      # Stripe webhooks
│   ├── components/
│   │   ├── previews/            # Platform preview components
│   │   ├── ExportButton.tsx
│   │   ├── MetaPreview.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TagInput.tsx
│   │   ├── UrlInput.tsx
│   │   ├── UsageCounter.tsx
│   │   └── ValidationSummary.tsx
│   ├── layout.tsx               # Root layout with meta tags
│   ├── page.tsx                 # Home page
│   └── globals.css
├── types/
│   └── meta.ts                  # TypeScript types
└── public/                      # Static assets
```

## 🎨 Features Breakdown

### Free Plan
- ✅ 5 meta tag previews per day
- ✅ All preview platforms (FB, Twitter, LinkedIn)
- ✅ Manual tag editing
- ✅ Validation & warnings
- ✅ Export as PNG

### Pro Plan ($9/mo)
- ✅ Unlimited previews
- ✅ API access (coming soon)
- ✅ Priority support
- ✅ No daily limits

## 🧪 Testing

To test Stripe checkout in test mode:

1. Use Stripe test card number: `4242 4242 4242 4242`
2. Any future expiration date
3. Any CVC (3 digits)
4. Any postal code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Stripe](https://stripe.com/) - Payment processing
- [Cheerio](https://cheerio.js.org/) - HTML parsing
- [Lucide](https://lucide.dev/) - Beautiful icons

---

Made with ❤️ by the Meta Tags Preview Team
