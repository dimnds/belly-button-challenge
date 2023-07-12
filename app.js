// Set Path
const samples = 'samples.json';
// Fetch the JSON data and console log it
d3.json(samples).then((data) => {
    console.log(data);
});
function init() {
    // Dropdown menu selector
    let dropDownMenu = d3.select('#selDataset');
    // Dropdown menu pop
    d3.json(samples).then((data) => {
        let sNames = data.names;
        // Sample list
        sNames.forEach((sample) => {
            dropDownMenu.append('option').text(sample).property('value', sample);
        });
        //First Sample for init()
        let firstSample = sNames[0];
        barChart(firstSample);
        bubbleChart(firstSample);
        metaData(firstSample);
    });
};
init();
// function defined as same name in index.html onchange to update data
function optionChanged(newSample) {
    barChart(newSample);
    bubbleChart(newSample);
    metaData(newSample);
};
function barChart(sample) {
    //Data Grab
    d3.json(samples).then((data) => {
        let dSamples = data.samples;
        // Filter to select data by id
        let sampleFilter = dSamples.filter(Obj => Obj.id == sample);
        let sampleResult = sampleFilter[0];
        let otu_ids = sampleResult.otu_ids;
        let otu_labels = sampleResult.otu_labels;
        let sample_values = sampleResult.sample_values;
        // Trace and Plot for bar graph
        let trace = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(ids => `OTU ${ids}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];
        Plotly.newPlot('bar', trace);
        console.log(`${sample} bar chart loaded`)
    });
};
function bubbleChart(sample) {
    //Data Grab
    d3.json(samples).then((data) => {
        let dSamples = data.samples;
        // Filter to select data by id
        let sampleFilter = dSamples.filter(Obj => Obj.id == sample);
        let sampleResult = sampleFilter[0];
        let otu_ids = sampleResult.otu_ids;
        let otu_labels = sampleResult.otu_labels;
        let sample_values = sampleResult.sample_values;
        // Trace and Plot for bubble graph
        let trace = [{
            x: otu_ids ,
            y: sample_values ,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth',
            }
        }];
        Plotly.newPlot('bubble', trace);
        console.log(`${sample} bubble chart loaded`)
    });
};
function metaData(sample) {
    d3.json(samples).then((data) => {
        let dMeta = data.metadata;
        // Filter to select data by id
        let metaFilter = dMeta.filter(Obj => Obj.id == sample);
        let metaResult = metaFilter[0];
        // selector for the reference in index.html
        let panel = d3.select("#sample-metadata");
        // clear old data
        panel.html("");
        // build new data
        Object.entries(metaResult).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
        console.log(`${sample} metadata loaded`)
    });
};