
function PostsContainer({children} : {children : React.ReactNode}) {
  return (
    <main className="w-full sm:w-4/5 mx-auto p-8 mt-4 flex flex-col md:grid md:grid-cols-2 gap-12 justify-center">{children}</main>
  )
}

export default PostsContainer