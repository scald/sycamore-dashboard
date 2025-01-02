# Caldwell Trio Dashboard

A modern, dark-themed dashboard for viewing the Caldwell kids' grades from Sycamore School. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌙 Modern dark theme with sleek UI
- 📊 Real-time grade tracking for all children
- 📱 Responsive design (mobile, tablet, desktop)
- 🎯 Color-coded grades for quick performance assessment
- 📈 Automatic grade averages calculation
- 🔄 Auto-sorted grades (highest to lowest)

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd caldwell-trio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
SYCAMORE_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: Sycamore School API
- **State Management**: React Hooks
- **Build Tool**: Turbopack

## Security

- API key is securely stored server-side
- All API calls are proxied through Next.js API routes
- No sensitive data exposed to the client

## Project Structure

- `/src/app` - Next.js application routes
- `/src/lib` - Shared utilities and API client
- `/src/lib/types` - TypeScript type definitions
- `/src/lib/api` - API integration layer

## License

Private use only. Not for distribution.
