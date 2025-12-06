const dummy = (blogs) =>{
    return 1;
}
const totalLikes = (blogs)=>{
    if(blogs.length === 0) return 0;
    const res = blogs.reduce((prev,curr)=>{
        return prev + curr.likes;
    },0)
    return res;
}
const favouriteBlog = (blogs)=>{
    if(blogs.length === 0) return {};
    const res = blogs.reduce((prev,curr)=>{
        if(prev.likes > curr.likes) return prev;
        else return curr;
    },blogs[0])
    return res;
}
const mostBlogs = (blogs) =>{
    if(blogs.length === 0) return {};
    let res = 0;
    let author = "";
    for(let i = 0;i<blogs.length;i++){
        let count = 0;
        for(let j = 0;j<blogs.length;j++){
            if(blogs[i].author === blogs[j].author) count++;
        }
        if(res < count){
            res = count;
            author = blogs[i].author
        }
    }
    return {
        author : author,
        blogs : res
    }
}
const mostLikes = (blogs) =>{
    if(blogs.length === 0) return {};
    let res = 0;
    let author = "";
    for(let i = 0;i<blogs.length;i++){
        let count = 0;
        for(let j = 0;j<blogs.length;j++){
            if(blogs[i].author === blogs[j].author) {
                // console.log(blogs[i].likes)
                count += blogs[j].likes;
            }
        }
        // console.log("---------------------------",blogs[i].author,count,"------------------------")
        if(res < count){
            res = count;
            author = blogs[i].author
        }
    }
    // console.log("res: ",res)
    return {
        author : author,
        likes : res
    }     
}
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}
