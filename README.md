# Realtime Chat Application

This is a full-stack realtime chat application developed using Next.js with Redis for data storage and Pusher for real-time communication. The project incorporates authentication via NextAuth with Google and GitHub providers to secure access to the dashboard and enable real-time chatting functionality among authenticated users.

## Features

- **Realtime Communication:** Users can chat in real-time with their friends or connections.
- **Authentication:** Users can log in using their Google or GitHub accounts securely.
- **Dashboard:** Once logged in, users are directed to the dashboard where they can manage their chats and friend requests.
- **Friend Requests:** Users can send and respond to friend requests, enabling communication with accepted connections.
- **Unread Message Notifications:** Users are notified of unread messages and can see how many messages are pending to be read.
- **Message Sorting:** Recent chats appear at the top for easy access to recent conversations.
- **Project Preview:** Watch the project preview video [here](https://portfolio.abhradippaul.blog/project/realtime-chat) to see a demo of the application.

## Technology Stack

- **Frontend:** Next.js
- **Backend:** Next.js (API routes for backend logic)
- **Database:** Redis (utilizing string, sorted set, and hash data types)
- **Real-time Communication:** Pusher
- **Authentication:** NextAuth with Google and GitHub providers

## How It Works

1. **Authentication:** Users must log in using either their Google or GitHub accounts via NextAuth.
2. **Dashboard Access:** Once authenticated, users are granted access to the dashboard page.
3. **Friend Requests:** Users can send friend requests to other users.
4. **Chatting:** Upon accepting friend requests, users can communicate in real-time with their connections.
5. **Unread Messages:** Users are notified of unread messages and can view pending messages.
