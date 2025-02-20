function TomorrowDate() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    return tomorrow.toISOString().split("T")[0]; // "YYYY-MM-DD"
}
export default TomorrowDate