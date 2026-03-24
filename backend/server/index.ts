import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// --- Institutional Middleware ---
app.use(helmet()); // Security headers
app.use(cors());   // Cross-Origin Resource Sharing
app.use(morgan('dev')); // Diagnostic logging
app.use(express.json()); // Body parsing

// --- Database Synchronization ---
if (!MONGODB_URI) {
  console.error('[INSTITUTIONAL_SERVER_ERROR] MONGODB_URI is not defined in environment.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('[INSTITUTIONAL_SERVER] Connected to Institutional Database.'))
  .catch((err) => console.error('[INSTITUTIONAL_SERVER_ERROR] Database connection failed:', err));

// --- API Architecture ---

// Health Pulse
app.get('/pulse', (req, res) => {
  res.json({ status: 'ACTIVE', timestamp: new Date().toISOString() });
});

// Root Node
app.get('/', (req, res) => {
  res.send('EAOverseas Dedicated Institutional Server | Status: OPERATIONAL');
});

// --- Dynamic Route Orchestration ---
import { Blog } from '../lib/db/models/Blog';
import Lead from '../lib/db/models/Lead';

app.get('/api/v1/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch intelligence nodes' });
  }
});

app.get('/api/v1/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch intelligence node' });
  }
});

app.patch('/api/v1/blogs/:slug/view', async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ views: blog?.views });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync view count' });
  }
});

app.post('/api/v1/blogs/:slug/like', async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json({ likes: blog?.likes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync like' });
  }
});

app.post('/api/v1/blogs/:slug/comment', async (req, res) => {
  try {
    const { user, content } = req.body;
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $push: { comments: { user, content, createdAt: new Date() } } },
      { new: true }
    );
    res.json({ comments: blog?.comments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish comment' });
  }
});

app.post('/api/v1/leads', async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);
    res.status(201).json(newLead);
  } catch (error) {
    res.status(400).json({ error: 'Failed to synchronize lead node' });
  }
});

// --- Error Lifecycle Management ---
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[SERVER_EXCEPTION]', err);
  res.status(500).json({ message: 'Institutional Server Error', error: err.message });
});

// --- Execution ---
app.listen(PORT, () => {
  console.log(`[INSTITUTIONAL_SERVER] Scalable Backend Active on port ${PORT}`);
});
