# Instagram DM Chat Application

A sophisticated chat application that integrates with Instagram Direct Messages, featuring AI-powered responses and user management through Clerk authentication.

## Features

- Instagram DM integration
- AI-powered automated responses using OpenAI
- User authentication with Clerk
- Dashboard interface
- Real-time messaging
- Automated message handling
- Custom response templates
- Analytics tracking

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Instagram Business/Creator Account
- OpenAI API account
- Clerk account
- Instagram Graph API access

## Environment Configuration

Create a `.env` file in the root directory with the following configurations:

```env
# Database Configuration
DATABASE_URL="your_database_url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

# Application URLs
NEXT_PUBLIC_NGROK_URL="your_ngrok_url_for_development"
NEXT_PUBLIC_HOST_URL="http://localhost:3000"

# Stripe Configuration (Optional)
STRIPE_SUBSCRIPTION_PRICE_ID="your_stripe_price_id"
STRIPE_CLIENT_SECRET="your_stripe_secret"

# Instagram Configuration
INSTAGRAM_BASE_URL="https://graph.instagram.com"
INSTAGRAM_EMBEDDED_OAUTH_URL="your_instagram_oauth_url"
INSTAGRAM_CLIENT_ID="your_instagram_client_id"
INSTAGRAM_CLIENT_SECRET="your_instagram_client_secret"
INSTAGRAM_TOKEN_URL="https://api.instagram.com/oauth/access_token"

# OpenAI Configuration
OPEN_AI_KEY="your_openai_api_key"
```

## Setup Instructions

1. **Clone and Install:**
```bash
git clone https://github.com/ParthDevInnovator/Trigly.git
cd Trigly
npm install
```

2. **Instagram Setup:**
   - Create a Meta Developer account
   - Create a new app in Meta Developers Console
   - Configure Instagram Graph API
   - Set up OAuth redirect URLs
   - Get your Client ID and Client Secret

3. **Clerk Setup:**
   - Create a Clerk application
   - Configure authentication settings
   - Get your publishable and secret keys

4. **Database Setup:**
   - Set up your preferred database
   - Update DATABASE_URL in .env

5. **OpenAI Setup:**
   - Get your OpenAI API key
   - Add it to OPEN_AI_KEY in .env

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. For local testing with Instagram webhooks, use ngrok:
```bash
ngrok http 3000
```
Update NEXT_PUBLIC_NGROK_URL with your ngrok URL

## Instagram Integration Features

- Automated DM responses
- Message history tracking
- Custom response templates
- User profile management
- Analytics dashboard
- Multi-account support

## Webhook Setup

1. Configure Instagram Webhooks in Meta Developer Console
2. Use ngrok URL for development webhook testing
3. Verify webhook subscription
4. Handle webhook events in the application

## Best Practices

- Keep your Instagram access tokens secure
- Regularly rotate API keys
- Monitor API usage limits
- Test webhook handling thoroughly
- Implement rate limiting
- Handle API errors gracefully

## Troubleshooting

Common issues and solutions:

1. **Instagram Authentication Issues:**
   - Verify Instagram permissions
   - Check OAuth configuration
   - Validate redirect URLs

2. **Webhook Problems:**
   - Confirm ngrok is running
   - Verify webhook subscription
   - Check webhook signatures

3. **API Limits:**
   - Monitor Instagram API usage
   - Implement proper rate limiting
   - Handle API throttling

## Development Guidelines

1. Use environment variables for sensitive data
2. Implement proper error handling
3. Follow Instagram's API guidelines
4. Maintain proper logging
5. Regular testing of webhook endpoints

## Security Considerations

- Never commit .env file
- Secure storage of Instagram tokens
- Proper session management
- Rate limiting implementation
- Input validation
- Error handling

## Support

For support:
1. Check documentation
2. Raise GitHub issues
3. Contact maintainers

---

Remember to handle Instagram tokens securely and follow Meta's platform policies.
