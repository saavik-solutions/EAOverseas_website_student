import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
);

const universityIndex = client.initIndex('universities');
const courseIndex = client.initIndex('courses');

export const searchService = {
  /**
   * Indexes a university into Algolia
   */
  async indexUniversity(university: any) {
    return universityIndex.saveObject({
      objectID: university.id,
      ...university,
    });
  },

  /**
   * Indexes multiple courses into Algolia
   */
  async indexCourses(courses: any[]) {
    return courseIndex.saveObjects(
      courses.map((course) => ({
        objectID: course.id,
        ...course,
      }))
    );
  },

  /**
   * Performs a global search across universities and courses
   */
  async globalSearch(query: string) {
    const results = await client.multipleQueries([
      { indexName: 'universities', query },
      { indexName: 'courses', query },
    ]);
    return results.results;
  },
};
