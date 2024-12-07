interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col items-center  mx-auto mt-3">
      <div className="w-2/5 flex flex-wrap flex-col">
        <div className="flex">
          <Author name={authorName} size={24}/>
          <div className="font-semibold text-slate-600 mr-2">
            {" "}
            {authorName + " ."}{" "}
          </div>
          <div className="font-thin text-slate-500 ">
            {"  "}
            {"  " + publishedDate}{" "}
          </div>
        </div>
        <div className="font-semibold text-xl">{title}</div>
        <div className="text-md font-thin">
          {content.slice(0, 100)}
          {content.length > 100 ? "..." : ""}
        </div>
        <div className="text-slate-400 text-sm">
          {Math.ceil(content.length / 100) + " minute(s) read"};
        </div>
        <div className="bg-slate-300 h-0.5 w-full mt-3" />
      </div>
    </div>
  );
};

export function Author({ name ,size}: { name: string,size?:number }) {
  const second = name.split(" ")[1][0];
  const init = name[0] + second;
  return (
    <div
    className={`bg-slate-600 rounded-full pl-1 pr-1 mx-1 pt-1 text-cyan-400 font-serif text-xs mr-3`}
    style={{ width: `${size}px`, height: `${size}px` }}
  >
  
      {init}
    </div>
  );
}
export default BlogCard;
