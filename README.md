
## Features

- Download media from popular platforms:
  - Bluesky
  - CapCut
  - Dailymotion
  - Douyin
  - Facebook & Instagram ( meta )
  - Kuaishou
  - LinkedIn
  - Pinterest
  - Reddit
  - Snapchat
  - Soundcloud
  - Spotify
  - Terabox
  - Threads
  - TikTok
  - Tumblr
  - Twitter ( X )
  - YouTube
- Easy REST API endpoints
- Built with JavaScript
- **~~Swagger API documentation included~~**
- Modular architecture: services, controllers, routes

---


## Usage

1. Start the server:

```bash
npm start
```

2. Access API at:
   [http://localhost:3000/](http://localhost:3000/)

3. Example API request to download Instagram media:

```
GET http://localhost:3000/api/meta/download?url=https://www.instagram.com/p/DLHQfPiyucu/
```

Response:

```json
{
  "success": true,
  "data": {
    // media download info here
  }
}
```

---

## API Endpoints

| Endpoint                    | Description                       | Method |
| --------------------------- | --------------------------------- | ------ |
| `/api/bluesky/download`     | Download Bluesky media            | GET    |
| `/api/capcut/download`      | Download CapCut media             | GET    |
| `/api/dailymotion/download` | Download Dailymotion media        | GET    |
| `/api/douyin/download`      | Download Douyin media             | GET    |
| `/api/kuaishou/download`    | Download Kuaishou media           | GET    |
| `/api/linkedin/download`    | Download LinkedIn media           | GET    |
| `/api/meta/download`        | Download Facebook/Instagram media | GET    |
| `/api/pinterest/download`   | Download Pinterest media          | GET    |
| `/api/reddit/download`      | Download Reddit media             | GET    |
| `/api/snapchat/download`    | Download Snapchat media           | GET    |
| `/api/soundcloud/download`  | Download Soundcloud media         | GET    |
| `/api/spotify/download`     | Download Spotify media            | GET    |
| `/api/terabox/download`     | Download Terabox media            | GET    |
| `/api/threads/download`     | Download Threads media            | GET    |
| `/api/tiktok/download`      | Download TikTok media             | GET    |
| `/api/tumblr/download`      | Download Tumblr media             | GET    |
| `/api/twitter/download`     | Download Twitter media            | GET    |
| `/api/youtube/download`     | Download YouTube media            | GET    |

**~~See the full interactive API docs with Swagger at `/api-docs`.~~**

---

## Project Structure

```
.
├── controllers/       # API route handlers
├── routes/            # Express route definitions
├── services/          # Business logic & downloader functions
├── server.js          # Express app entry point
└── package.json
```

---


## Author

Luonghiii — [GitHub](https://github.com/luonghiii)
