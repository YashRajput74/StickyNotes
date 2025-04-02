export function addDate(){
    const month = ["Jan ", "Feb ", "Mar ", "Apr ", "May ", "June ", "July ", "Aug ", "Sept ", "Oct ", "Nov ", "Dec "];
    const date = new Date();
    return month[date.getMonth()] + date.getDate();
}