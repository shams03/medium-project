export const Appbar = ({name}:{name: string}) => {
  const second = name.split(" ")[1][0];
  const init = name[0] + second;
  console.log(init)
  return (
    <div className="flex  justify-between h-12 bg-slate-400">
      <div className="text-xl pl-5 pt-2 font-mono font-semibold"> Medium </div>
      <div
        className={`bg-slate-600 rounded-full pl-2 mt-1 pr-3 w-10 h-10 mx-1 pt-2 text-cyan-400 font-serif text-l mr-3`}
      >
        {init}
      </div>
    </div>
  );
};
