function formatTxt(data, num){
    let ans = data.substring(0, num);
    ans+='...';
    return ans;
}

export default formatTxt;