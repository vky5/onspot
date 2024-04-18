import { useEffect, useState } from "react";
import axios from 'axios';

import formatDate from "../utils/dateFormat";

const TableComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    async function getPosts(){
      try {
        const url = import.meta.env.VITE_BACKEND_URL + "/api/v1/posts"
        const response = await axios.get(url);
        setPosts(response.data.posts);
        console.log(posts)
      } catch (error) {
        console.log(error);
      }
    }
    getPosts()
  }, []);
  
    return (
        <div className="overflow-x-auto flex text-center">
            <table className="min-w-full border-collapse border bg-gray-900 text-basem sm:text-base">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 hidden md:table-cell">ID</th>
                        <th className="border px-4 py-2 hidden md:block">Date</th>
                        <th className="border px-4 py-2">Handle</th>
                        <th className="border px-4 py-2">Heading</th>
                        <th className="border px-4 py-2 hidden md:block">Likes ❤️</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(ele=>{return (
                      <tr key={ele.generatedId}>
                        <td className="border px-4 py-2 hidden md:table-cell">{ele.generatedId}</td>
                        <td className="border px-4 py-2 hidden md:block">{formatDate(ele.date)}</td>
                        <td className="border px-4 py-2">{ele.username}</td>
                        <td className="border px-4 py-2">{ele.heading}</td>
                        <td className="border px-4 py-2 hidden md:block">{ele.like}</td>
                        
                      </tr>
                    )})}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
