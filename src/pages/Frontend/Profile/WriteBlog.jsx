import React from 'react'

function WriteBlog() {
    return (
        <div className='bg-white p-6'>
            <h1 className="text-2xl mb-6 text-gray-800">
                Write a Blog
            </h1>
            <form class="max-w-xl mx-auto bg-white p-6 ">
                {/* <h2 class="text-xl font-semibold mb-4 text-gray-700">Create Post</h2> */}

                <div class="pb-4">
                    <label for="title" class="block mb-2 text-gray-800 font-medium">Title</label>
                    <input type="text" id="title" class="block border border-gray-300 w-full p-2 focus:outline-none focus:ring focus:border-blue-400" />
                </div>

                <div class="pb-4">
                    <label for="body" class="block mb-2 text-gray-800 font-medium">Body</label>
                    <textarea id="body" rows="6" class="block border border-gray-300 w-full p-2 focus:outline-none focus:ring focus:border-blue-400"></textarea>
                </div>

                <div class="pb-4">
                    <label for="tags" class="block mb-2 text-gray-800 font-medium">Tags</label>
                    <input type="text" id="tags" class="block border border-gray-300 w-full p-2 focus:outline-none focus:ring focus:border-blue-400" />
                </div>

                <div class="pb-4">
                    <label for="slug" class="block mb-2 text-gray-800 font-medium">Slug</label>
                    <input type="text" id="slug" class="block border border-gray-300 w-full p-2 focus:outline-none focus:ring focus:border-blue-400" />
                </div>

                <div class="pt-4">
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4">
                        Save Post
                    </button>
                </div>
            </form>

        </div>
    )
}

export default WriteBlog