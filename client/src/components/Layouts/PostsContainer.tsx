type PostsContainerProps = {
  children: React.ReactNode;
};

const PostsContainer = ({ children }: PostsContainerProps) => {
  return (
    <main className="w-full sm:w-[85%] lg:w-4/5 mx-auto my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-6">
      {children}
    </main>
  );
};

export default PostsContainer;
