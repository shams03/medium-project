import { Appbar } from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import { useBlog } from "../hooks/UseBlog";

const Blogs = () => {
  const [loading, blogs] = useBlog();
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Appbar name="Shams King" />
          {blogs.map((item) => (
            <BlogCard
              title="Title ki maa ki choot  kh oh oh o ho "
              authorName="Shams Zaman"
              publishedDate="7 Dec 2024"
              content="Content ki maa ka bhosda ohohoh oho ho h oh oh o ho ho ho h oh oh oh o ho o o"
            />
          ))}
        </>
      )}
    </div>
  );
};
export default Blogs;
