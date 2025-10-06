const paths = {
  home() {
    return '/';
  },
  topicDetail(topicSlug: string) {
    return `/topic/${topicSlug}`;
  },
  postCreate(topicSlug: string) {
    return `/topic/${topicSlug}/post/create`;
  },
  postDetail(topicSlug: string, postId: string) {
    return `/topic/${topicSlug}/post/${postId}`;
  },
};

export default paths;