"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchService = void 0;
const algoliasearch_1 = __importDefault(require("algoliasearch"));
const client = (0, algoliasearch_1.default)(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const universityIndex = client.initIndex('universities');
const courseIndex = client.initIndex('courses');
exports.searchService = {
    /**
     * Indexes a university into Algolia
     */
    async indexUniversity(university) {
        return universityIndex.saveObject({
            objectID: university.id,
            ...university,
        });
    },
    /**
     * Indexes multiple courses into Algolia
     */
    async indexCourses(courses) {
        return courseIndex.saveObjects(courses.map((course) => ({
            objectID: course.id,
            ...course,
        })));
    },
    /**
     * Performs a global search across universities and courses
     */
    async globalSearch(query) {
        const results = await client.multipleQueries([
            { indexName: 'universities', query },
            { indexName: 'courses', query },
        ]);
        return results.results;
    },
};
