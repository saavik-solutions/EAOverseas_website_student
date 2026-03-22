# EAOverseas: Institutional API Master Reference 🚀🏛️🏦💎

Welcome to the EAOverseas Unified API ecosystem. This guide provides the definitive reference for both our **Gateway Serverless APIs** (Next.js) and our **Dedicated Scalable APIs** (Express).

## 1. Gateway Platform APIs (Next.js Architecture) ⚡
*Located in `frontend/app/api` | Powered by Vercel Serverless*

### Recruitment & Lead Intelligence
- **`POST /api/leads`**: Capture new student interest data.
  - **Payload**: `{ name, email, phone, country, interest }`
  - **Security**: Stateless or Session-based.

### Social & Community Engine
- **`GET /api/feed`**: Retrieve the global institutional feed.
- **`POST /api/feed`**: Publish a new broadcast (Admin Only).
- **`POST /api/feed/[id]/action`**: Execute likes, comments, or replies.

### Editorial Management (CMS)
- **`GET /api/admin/blogs`**: List all internal blogs.
- **`POST /api/admin/blogs`**: Publish a new architectural blog.
- **`PUT /api/admin/blogs/[id]`**: Update editorial content.

---

## 2. Dedicated Scalable APIs (Express Architecture) 🛡️🏦
*Located in `backend/server` | Powered by Render Node.js Service*

### Institutional Uptime & Health
- **`GET /pulse`**: Returns `200 OK` with system telemetry. Use this for monitoring service health on Render.

### High-Performance Data Retrieval
- **`GET /api/v1/blogs`**: Specialized endpoint for external syndication or high-scale UI hydration.
- **`GET /api/v1/blogs/:slug`**: Retrieve full structural content for a specific blog.

### Persistent Data Vault
- **`POST /api/v1/leads`**: Direct-to-DB persistent lead capture. Optimized for high-volume recruitment fairs.
- **`GET /api/v1/leads`**: (Admin) Secure retrieval of the Lead Vault dataset.

---

## 3. External Integration (Lead Vault API) 🛡️💎
To connect an external landing page to the **EAOverseas Lead Vault**:

1. **Endpoint**: `https://[RENDER_URL]/api/v1/leads`
2. **Payload**:
```json
{
  "source": "USA Education Fair",
  "data": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "interest": "Computer Science"
  }
}
```

## 4. Operational Troubleshooting 🧪
- **Next.js API Issues**: Check Vercel Function Logs.
- **Express Server Issues**: Check Render Service Logs.
- **Database Connection**: Both layers use `MONGODB_URI` for synchronized persistence.

**Institutional Readiness: 100% | API Master: ACTIVE** 🚀🏢🏦💎
