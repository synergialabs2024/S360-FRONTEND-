// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import BlogListing from '@/components/apps/blog/BlogListing';

const Blog = () => {
  return (
    <PageContainer title="Blog" description="this is Blog page">
      <Breadcrumb title="Blog app" subtitle="Get the latest news" />
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      <BlogListing />
    </PageContainer>
  );
};

export default Blog;
