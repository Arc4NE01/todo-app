import React from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>
        <Toaster />
        {children}
      </main>
    </div>
  );
};

Layout.defaultProps = {
  title: "TaskTracker",
  description: "To Do List App",
  keywords: "MERN, todolist, react, routine",
  author: "Shammo",
};

export default Layout;
