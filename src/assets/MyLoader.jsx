const MyLoader = () => {
    return (
        <div className="bg-white w-full min-h-screen flex justify-center items-center">
            <div>
                <div className="animate-spin"><div className="lg:scale-[0.7] scale-[0.65] custom-loader"></div></div>
                <p className='text-[14px] text-rose-700 font-[600]'>Loading ...</p>
            </div>
        </div>

    )
}
export default MyLoader
