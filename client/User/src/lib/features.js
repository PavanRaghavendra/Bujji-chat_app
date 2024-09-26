import moment from "moment";

const fileFormat=(url="")=> {
    const fileExtension=url.split(".").pop();
    if(fileExtension==="mp4"||fileExtension==="webm"||fileExtension==="ogg")
        return "video";
    if(fileExtension==="mp3"||fileExtension==="wav")
        return "audio"
    if(
        fileExtension==="png"||
        fileExtension==='jpg'||
        fileExtension==='jpeg'||
        fileExtension==='gif'
    )
    return "image";
    return "file";
};
const getLast7Days=()=>
    {
        const currentdate=moment();
        const last7Days=[];
        for(let i=0;i<7;i++)
            {
                const daydate=currentdate.clone().subtract(i,"days");
                const dayname=daydate.format("dddd");
                last7Days.unshift(dayname);
            }
            return last7Days;
    };

export {fileFormat,getLast7Days}