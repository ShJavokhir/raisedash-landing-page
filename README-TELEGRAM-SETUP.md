# Telegram Integration Setup

This project includes a demo request form that sends notifications to a Telegram channel when users submit demo requests.

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat with BotFather
3. Send `/newbot` command
4. Follow the prompts to create your bot
5. Save the bot token you receive

### 2. Get Chat ID

#### Option A: Personal Chat
1. Start a chat with your bot
2. Send any message to the bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for the `chat.id` in the response

#### Option B: Channel/Group
1. Add your bot to a channel or group
2. Make the bot an admin (for channels)
3. Send a message in the channel/group
4. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
5. Look for the `chat.id` in the response

### 3. Environment Variables

Create a `.env.local` file in your project root with:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Visit `/request-demo`
3. Fill out and submit the form
4. Check your Telegram channel for the notification

## Message Format

The Telegram message includes:
- Contact information (name, email, phone, job title)
- Company details (name, industry, size)
- Implementation timeline
- Current challenges
- Additional message
- Timestamp

## Troubleshooting

- Make sure your bot token is correct
- Ensure the chat ID is valid
- Check that the bot has permission to send messages
- Verify environment variables are loaded correctly
- Check the server logs for any error messages
