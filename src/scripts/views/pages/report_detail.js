const DetailReport = {
    asyncrender() {
        return `
        <div class="container">
            <h1>Detail Report</h1>
        </div>
        `;
    },
    afterRender() {
        console.log("Detail Report");
    }
}

export default DetailReport;

