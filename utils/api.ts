import axios from "axios";

export const fetchPosts = async () => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return data;
    } catch (error) {
        console.log(error);

    }
};