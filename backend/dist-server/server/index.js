"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
// --- Institutional Middleware ---
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)()); // Cross-Origin Resource Sharing
app.use((0, morgan_1.default)('dev')); // Diagnostic logging
app.use(express_1.default.json()); // Body parsing
// --- Database Synchronization ---
if (!MONGODB_URI) {
    console.error('[INSTITUTIONAL_SERVER_ERROR] MONGODB_URI is not defined in environment.');
    process.exit(1);
}
mongoose_1.default.connect(MONGODB_URI)
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
const Blog_1 = require("../lib/db/models/Blog");
const Lead_1 = __importDefault(require("../lib/db/models/Lead"));
app.get('/api/v1/blogs', async (req, res) => {
    try {
        const blogs = await Blog_1.Blog.find({ published: true }).sort({ createdAt: -1 });
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch intelligence nodes' });
    }
});
app.post('/api/v1/leads', async (req, res) => {
    try {
        const newLead = await Lead_1.default.create(req.body);
        res.status(201).json(newLead);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to synchronize lead node' });
    }
});
// --- Error Lifecycle Management ---
app.use((err, req, res, next) => {
    console.error('[SERVER_EXCEPTION]', err);
    res.status(500).json({ message: 'Institutional Server Error', error: err.message });
});
// --- Execution ---
app.listen(PORT, () => {
    console.log(`[INSTITUTIONAL_SERVER] Scalable Backend Active on port ${PORT}`);
});
